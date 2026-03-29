import { ROLE } from '@/consts/role';
import { assertHasCompany, PublicUserWithCompany, requireRole } from '@/features/auth/lib/authGuard';

export const requireDepartmentManagement = async (): Promise<PublicUserWithCompany> => {
  const { user } = await requireRole([ROLE.COMPANY_ADMIN, ROLE.DEPARTMENT_ADMIN]);
  assertHasCompany(user);
  return user;
};
