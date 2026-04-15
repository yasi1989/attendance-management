import { ROLE } from '@/consts/role';
import { requireRole } from '@/features/auth/lib/authGuard';
import { Result } from '@/lib/result';
import { PublicUserWithRole } from '@/lib/actionTypes';

export const requireTenantManagement = async (): Promise<Result<PublicUserWithRole>> => {
  const result = await requireRole([ROLE.SYSTEM_ADMIN]);
  if (!result.success) return result;
  return { success: true, data: result.data.user };
};

