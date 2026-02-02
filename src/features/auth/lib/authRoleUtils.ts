import { eq } from 'drizzle-orm';
import { ROLE, RoleCodeType } from '@/consts/role';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { requireAuth } from './authUtils';
import { getRoleById } from './roleCache';

export const requireRole = (allowsRoles: RoleCodeType[]) => async () => {
  const session = await requireAuth();
  const user = await db.query.users.findFirst({ where: eq(users.id, session.user.id) });
  if (!user) {
    throw new Error('ユーザー情報が見つかりません');
  }
  if (!user.roleId) {
    throw new Error('ユーザーのロールが設定されていません。');
  }
  const userRole = await getRoleById(user.roleId);
  if (!allowsRoles.includes(userRole.roleCode as RoleCodeType)) {
    throw new Error('権限がありません。');
  }
  return { session, user, userRole };
};

export const requireSystemAdmin = async () => requireRole([ROLE.SYSTEM_ADMIN])();
