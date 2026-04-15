import { eq } from 'drizzle-orm';
import { PublicUserWithRole } from './actionTypes';
import { db } from './db/drizzle';
import { users } from './db/schema';
import { Result } from './result';

export const getUser = async (userId: string): Promise<Result<PublicUserWithRole>> => {
  const user = await db.query.users.findFirst({
    columns: {
      hashedPassword: false,
      emailVerified: false,
    },
    where: eq(users.id, userId),
    with: { role: true },
  });
  if (!user) return { success: false, error: new Error('ユーザー情報が見つかりません。') };
  if (!user.role) return { success: false, error: new Error('ユーザーのロールが設定されていません。') };
  return { success: true, data: user as PublicUserWithRole };
};
