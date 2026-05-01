import { RoleCodeType } from '@/consts/role';
import { PublicUserWithRole } from '@/lib/actionTypes';
import { getUser } from '@/lib/user';
import { requireAuth } from './authUtils';
import { Result } from '@/lib/result';

export const requireRole = async (
  allowsRoles: RoleCodeType[]
): Promise<Result<{ user: PublicUserWithRole }>> => {
  const session = await requireAuth();
  
  const userResult = await getUser(session.user.id);
  if (!userResult.success) return { success: false, error: userResult.error };
  
  const { data: user } = userResult;
  if (!allowsRoles.includes(user.role.roleCode)) {
    return { success: false, error: new Error('権限がありません。') };
  }
  
  return { success: true, data: { user } };
};

export type PublicUserWithCompany = PublicUserWithRole & { companyId: string };
export const checkHasCompany = (
  user: PublicUserWithRole
): Result<PublicUserWithCompany> => {
  if (!user.companyId) {
    return { success: false, error: new Error('会社情報が設定されていません') };
  }
  
  return { success: true, data: user as PublicUserWithCompany };
};
