import { ROLE } from '@/consts/role';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';

export const checkDepartmentAssignable = async (
  departmentId: string | null | undefined,
  companyId: string,
): Promise<ActionStateResult | null> => {
  if (!departmentId) return null;
  const department = await db.query.departments.findFirst({
    where: (departments, { eq, and }) => and(eq(departments.id, departmentId), eq(departments.companyId, companyId)),
  });
  if (!department) return { success: false, error: '指定された部署が見つかりません' };
  return null;
};

export const ensureNonSystemAdminRole = async (
  roleId: string | null | undefined,
  _companyId: string,
): Promise<ActionStateResult | null> => {
  if (!roleId) return null;
  const role = await db.query.roles.findFirst({
    where: (roles, { eq, and, ne }) => and(eq(roles.id, roleId), ne(roles.roleCode, ROLE.SYSTEM_ADMIN)),
  });
  if (!role) return { success: false, error: '指定されたロールは付与できません' };
  return null;
};
