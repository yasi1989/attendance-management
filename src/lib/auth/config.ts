import { getProviderName } from '@/consts/providers';
import { ROLE } from '@/consts/role';
import { URLS } from '@/consts/urls';
import { env } from '@/env';
import { getRoleByCode } from '@/features/auth/lib/roleCache';
import { db } from '@/lib/db/drizzle';
import { accounts, sessions, users } from '@/lib/db/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import type { NextAuthConfig } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const createCustomAdapter = (): Adapter => {
  const baseAdapter = DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  });

  return {
    ...baseAdapter,

    async createUser(userData) {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, userData.email!),
      });

      if (existingUser) {
        if (existingUser.hashedPassword) {
          throw new Error(
            'このメールアドレスは既にメールアドレス/パスワードで登録されています。そちらでログインしてください。',
          );
        }
        return existingUser;
      }

      const role = await getRoleByCode(ROLE.PERSONAL_USER);

      const [newUser] = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          name: userData.name!,
          email: userData.email!,
          emailVerified: userData.emailVerified ?? null,
          image: userData.image ?? null,
          roleId: role.id,
        })
        .returning();

      return newUser;
    },

    async linkAccount(account) {
      const user = await db.query.users.findFirst({
        where: eq(users.id, account.userId),
      });

      if (!user) {
        throw new Error('ユーザーが見つかりません。');
      }

      const existingAccount = await db.query.accounts.findFirst({
        where: (accounts, { and, eq }) =>
          and(eq(accounts.userId, account.userId), eq(accounts.provider, account.provider)),
      });

      if (existingAccount) {
        return;
      }

      await db.insert(accounts).values(account);
    },
  };
};

export const config = {
  adapter: createCustomAdapter(),
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, user.email!),
        });

        if (existingUser) {
          if (existingUser.hashedPassword) {
            return '/error?error=PasswordAccountExists';
          }

          const existingAccount = await db.query.accounts.findFirst({
            where: eq(accounts.userId, existingUser.id),
          });

          if (existingAccount && existingAccount.provider !== account?.provider) {
            return `/error?error=OAuthAccountExists&existingProvider=${existingAccount.provider}`;
          }
        }
      }

      if (account?.provider === 'credentials') {
        return !!(
          user.id &&
          (await db.query.users.findFirst({
            where: eq(users.id, user.id),
          }))
        );
      }

      return true;
    },

    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      });

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;

      return token;
    },
  },
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
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
          const linkedAccounts = await db.query.accounts.findMany({
            where: eq(accounts.userId, user.id),
          });

          if (linkedAccounts.length > 0) {
            const providerNames = linkedAccounts.map((acc) => getProviderName(acc.provider));
            throw new Error(
              `このメールアドレスは${providerNames.join(', ')}で登録されています。そちらでログインしてください。`,
            );
          }
          throw new Error('パスワードが設定されていません。');
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error('パスワードが正しくありません。');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: URLS.LOGIN,
    error: URLS.AUTH_ERROR,
  },
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },
  secret: env.AUTH_SECRET,
} satisfies NextAuthConfig;
