import { eq, InferSelectModel } from 'drizzle-orm';
import { ROLE } from '@/consts/role';
import { PublicUserWithCompany } from '@/features/auth/lib/authGuard';
import { db } from '@/lib/db/drizzle';
import { departments } from '@/lib/db/schema';

type Department = InferSelectModel<typeof departments>;

type Approver = {
  userId: string;
  stepOrder: number;
};

const collectApprovers = async (
  departmentId: string,
  excludeUserId: string,
  stepOrder: number,
  visited: Set<string>,
): Promise<Approver[]> => {
  if (visited.has(departmentId)) return [];
  visited.add(departmentId);

  const department: Department | undefined = await db.query.departments.findFirst({
    where: eq(departments.id, departmentId),
  });

  if (!department) return [];

  const current: Approver[] =
    department.managerUserId && department.managerUserId !== excludeUserId
      ? [{ userId: department.managerUserId, stepOrder }]
      : [];

  const parent: Approver[] = department.parentDepartmentId
    ? await collectApprovers(department.parentDepartmentId, excludeUserId, stepOrder + current.length, visited)
    : [];

  return [...current, ...parent];
};

const findCompanyAdmin = async (companyId: string): Promise<Approver | null> => {
  const companyAdminRole = await db.query.roles.findFirst({
    where: (r, { eq }) => eq(r.roleCode, ROLE.COMPANY_ADMIN),
  });

  if (!companyAdminRole) return null;

  const admin = await db.query.users.findFirst({
    where: (u, { and, eq }) => and(eq(u.companyId, companyId), eq(u.roleId, companyAdminRole.id)),
  });

  if (!admin) return null;
  return { userId: admin.id, stepOrder: 1 };
};

export const resolveApprover = async (user: PublicUserWithCompany): Promise<Approver[]> => {
  if (!user.departmentId) return [];

  const approvers = await collectApprovers(user.departmentId, user.id, 1, new Set());

  if (approvers.length > 0) return approvers;

  const admin = await findCompanyAdmin(user.companyId);
  return admin ? [{ ...admin, stepOrder: 1 }] : [];
};
