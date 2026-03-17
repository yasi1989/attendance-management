import { eq } from 'drizzle-orm';
import { ROLE, RoleCodeType } from '@/consts/role';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { requireAuth } from './authUtils';

export const requireRole = (allowsRoles: RoleCodeType[]) => async () => {
  const session = await requireAuth();
  const user = await db.query.users.findFirst({
    columns: {
      hashedPassword: false,
      emailVerified: false,
    },
    where: eq(users.id, session.user.id),
    with: { role: true },
  });
  if (!user) {
    throw new Error('ユーザー情報が見つかりません。');
  }
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
