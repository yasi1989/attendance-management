import { db } from '@/lib/db/drizzle';
import { accounts, sessions, users } from '@/lib/db/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { Adapter } from 'next-auth/adapters';
import { createNewUser, findUserByEmail, findUserById, isAccountAlreadyLinked } from './adapterHelpers';

export const createCustomAdapter = (): Adapter => {
  const baseAdapter = DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  });

  return {
    ...baseAdapter,

    async createUser(userData) {
      const existingUser = await findUserByEmail(userData.email!);

      if (existingUser) {
        if (existingUser.hashedPassword) {
          throw new Error(
            'このメールアドレスは既にメールアドレス/パスワードで登録されています。そちらでログインしてください。',
          );
        }
        return existingUser;
      }

      return createNewUser({
        name: userData.name!,
        email: userData.email!,
        emailVerified: userData.emailVerified,
        image: userData.image,
      });
    },

    async linkAccount(account) {
      const user = await findUserById(account.userId);

      if (!user) {
        throw new Error('ユーザーが見つかりません。');
      }

      const alreadyLinked = await isAccountAlreadyLinked(account.userId, account.provider);
      if (alreadyLinked) {
        return;
      }

      await db.insert(accounts).values(account);
    },
  };
};
