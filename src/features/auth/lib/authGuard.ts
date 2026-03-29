import { RoleCodeType } from '@/consts/role';
import { PublicUserWithRole } from '@/lib/actionTypes';
import { getUser } from '@/lib/user';
import { requireAuth } from './authUtils';

export const requireRole = async (allowsRoles: RoleCodeType[]): Promise<{ user: PublicUserWithRole }> => {
  const session = await requireAuth();
  const user = await getUser(session.user.id);
  if (!allowsRoles.includes(user.role.roleCode as RoleCodeType)) {
    throw new Error('権限がありません。');
  }
  return { user };
};

export type PublicUserWithCompany = PublicUserWithRole & { companyId: string };
export function assertHasCompany(user: PublicUserWithRole): asserts user is PublicUserWithCompany {
  if (!user.companyId) {
    throw new Error('会社情報が設定されていません');
  }
}
