import { ROLE } from '@/consts/role';
import { assertHasCompany, PublicUserWithCompany, requireRole } from '@/features/auth/lib/authGuard';

export const requireHolidayManagement = async (): Promise<PublicUserWithCompany> => {
  const { user } = await requireRole([ROLE.SYSTEM_ADMIN, ROLE.COMPANY_ADMIN]);
  assertHasCompany(user);
  return user;
};
