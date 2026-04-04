import { ROLE } from '@/consts/role';
import { assertHasCompany, PublicUserWithCompany, requireRole } from '@/features/auth/lib/authGuard';

export const requireExpenseAccess = async (): Promise<PublicUserWithCompany> => {
  const { user } = await requireRole([ROLE.DEPARTMENT_ADMIN, ROLE.COMPANY_ADMIN, ROLE.GENERAL_USER]);
  assertHasCompany(user);
  return user;
};
