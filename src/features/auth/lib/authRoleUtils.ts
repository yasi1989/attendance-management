import { ROLE, RoleCodeType } from '@/consts/role';
import { getUser } from '@/lib/user';
import { requireAuth } from './authUtils';

export const requireRole = (allowsRoles: RoleCodeType[]) => async () => {
  const session = await requireAuth();
  const user = await getUser(session.user.id);
  if (!user?.role) {
    throw new Error('ユーザーのロールが設定されていません。');
  }
  if (!allowsRoles.includes(user.role.roleCode as RoleCodeType)) {
    throw new Error('権限がありません。');
  }
  return { session, user, userRole: user.role };
};

export const requireSystemAdmin = async () => requireRole([ROLE.SYSTEM_ADMIN])();
export const requireCompanyAdmin = async () => {
  const result = await requireRole([ROLE.COMPANY_ADMIN])();
  if (!result.user.companyId) {
    throw new Error('会社情報が設定されていません');
  }
  return result as typeof result & { user: { companyId: string } };
};

export const requireAttendanceAccess = async () => {
  const result = await requireRole([
    ROLE.SYSTEM_ADMIN,
    ROLE.DEPARTMENT_ADMIN,
    ROLE.COMPANY_ADMIN,
    ROLE.GENERAL_USER,
    ROLE.PERSONAL_USER,
    ROLE.SYSTEM_ADMIN,
  ])();

  if (result.user.role?.roleCode !== ROLE.PERSONAL_USER && !result.user.companyId) {
    throw new Error('会社情報が設定されていません');
  }

  return result;
};
