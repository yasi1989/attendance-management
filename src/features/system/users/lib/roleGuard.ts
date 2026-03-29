import { ROLE } from '@/consts/role';
import { requireRole } from '@/features/auth/lib/authGuard';
import { PublicUserWithRole } from '@/lib/actionTypes';

export const requireUserManagement = async (): Promise<PublicUserWithRole> => {
  const { user } = await requireRole([ROLE.SYSTEM_ADMIN]);
  return user;
};
