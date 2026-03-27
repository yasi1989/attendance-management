import { eq } from 'drizzle-orm';
import { db } from './db/drizzle';
import { users } from './db/schema';

export const getUser = async (userId: string) => {
  const user = await db.query.users.findFirst({
    columns: {
      hashedPassword: false,
      emailVerified: false,
    },
    where: eq(users.id, userId),
    with: { role: true },
  });
  if (!user) throw new Error('ユーザー情報が見つかりません。');
  return user;
};
