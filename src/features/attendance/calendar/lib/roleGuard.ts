import { ROLE, RoleCodeType } from '@/consts/role';
import { assertHasCompany, requireRole } from '@/features/auth/lib/authGuard';
import { PublicUserWithRole } from '@/lib/actionTypes';

const ROLES_WITHOUT_COMPANY: RoleCodeType[] = [ROLE.PERSONAL_USER, ROLE.SYSTEM_ADMIN];

export const requireAttendanceManagement = async (): Promise<PublicUserWithRole> => {
  const { user } = await requireRole([
    ROLE.SYSTEM_ADMIN,
    ROLE.DEPARTMENT_ADMIN,
    ROLE.COMPANY_ADMIN,
    ROLE.GENERAL_USER,
    ROLE.PERSONAL_USER,
  ]);

  if (!ROLES_WITHOUT_COMPANY.includes(user.role.roleCode as RoleCodeType)) {
    assertHasCompany(user);
  }

  return user;
};
