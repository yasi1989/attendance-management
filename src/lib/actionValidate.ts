import { ROLE } from '@/consts/role';
import { ActionStateResult } from './actionTypes';
import { db } from './db/drizzle';

export const ensureUserInCompany = async (
  userId: string,
  companyId?: string | null,
): Promise<ActionStateResult | null> => {
  const user = await db.query.users.findFirst({
    where: (users, { eq, and }) =>
      companyId ? and(eq(users.id, userId), eq(users.companyId, companyId)) : eq(users.id, userId),
  });

  if (!user) return { success: false, error: 'ユーザーが見つかりませんでした。' };

  return null;
};

export const ensureUserNotInApprovalFlows = async (userId: string): Promise<ActionStateResult | null> => {
  const [attendanceApprovalRef, expenseApprovalRef] = await Promise.all([
    db.query.attendanceApprovalSteps.findFirst({
      where: (steps, { eq }) => eq(steps.approverId, userId),
    }),
    db.query.expenseGroupApprovalSteps.findFirst({
      where: (steps, { eq }) => eq(steps.approverId, userId),
    }),
  ]);

  if (attendanceApprovalRef || expenseApprovalRef) {
    return {
      success: false,
      error: 'このユーザーは承認経路に設定されているため削除できません。先に承認経路から外してください。',
    };
  }

  return null;
};

export const ensureUserNotDepartmentManager = async (
  userId: string,
  companyId?: string | null,
): Promise<ActionStateResult | null> => {
  const departmentManagerRef = await db.query.departments.findFirst({
    where: (departments, { eq, and }) =>
      companyId
        ? and(eq(departments.managerUserId, userId), eq(departments.companyId, companyId))
        : eq(departments.managerUserId, userId),
  });

  if (departmentManagerRef) {
    return {
      success: false,
      error: `このユーザーは「${departmentManagerRef.departmentName}」の管理者に設定されているため削除できません。先に管理者を変更してください。`,
    };
  }

  return null;
};

export const ensureCompanyAdminHasCompany = async (
  roleId: string | null | undefined,
  companyId: string | null | undefined,
): Promise<ActionStateResult | null> => {
  if (!roleId) return null;

  const role = await db.query.roles.findFirst({
    where: (r, { eq }) => eq(r.id, roleId),
  });

  if (role?.roleCode !== ROLE.COMPANY_ADMIN) return null;

  if (!companyId) {
    return { success: false, error: '会社管理者には会社の設定が必要です' };
  }

  return null;
};

export const ensureUniqueCompanyAdmin = async (
  roleId: string | null | undefined,
  companyId: string,
  excludeUserId: string,
): Promise<ActionStateResult | null> => {
  if (!roleId) return null;

  const role = await db.query.roles.findFirst({
    where: (r, { eq }) => eq(r.id, roleId),
  });

  if (role?.roleCode !== ROLE.COMPANY_ADMIN) return null;

  const existing = await db.query.users.findFirst({
    where: (u, { and, eq, ne }) => and(eq(u.companyId, companyId), eq(u.roleId, roleId), ne(u.id, excludeUserId)),
  });

  if (existing) return { success: false, error: '会社管理者はすでに存在します。1社に1人までです。' };
  return null;
};
