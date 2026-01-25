import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import Credentials from 'next-auth/providers/credentials';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { createLinkedAccountErrorMessage, getLinkedAccounts } from '../lib/accountValidation';

export const credentialsProvider = Credentials({
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async (credentials) => {
    if (!(typeof credentials?.email === 'string' && typeof credentials?.password === 'string')) {
      throw new Error('メールアドレスとパスワードを入力してください。');
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, credentials.email),
    });

    if (!user) {
      throw new Error('ユーザーが見つかりません。');
    }

    if (!user.hashedPassword) {
      const linkedAccountsInfo = await getLinkedAccounts(user.id);

      if (linkedAccountsInfo.hasLinkedAccounts) {
        throw new Error(createLinkedAccountErrorMessage(linkedAccountsInfo.providerNames));
      }

      throw new Error('メールアドレスまたはパスワードが間違っています。');
    }

    const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

    if (!isCorrectPassword) {
      throw new Error('メールアドレスまたはパスワードが間違っています。');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
});
