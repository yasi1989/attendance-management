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
