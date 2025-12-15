import { ROLE } from '@/consts/role';
import { db } from '@/lib/db/drizzle';
import { accounts, users } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getRoleByCode } from '../lib/roleCache';
import type { AdapterUser } from 'next-auth/adapters';

export interface UserCreationData {
  name: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
}

export const findUserByEmail = async (email: string) => {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
};

export const findUserById = async (userId: string) => {
  return db.query.users.findFirst({
    where: eq(users.id, userId),
  });
};

export const checkPasswordAccount = async (email: string): Promise<boolean> => {
  const user = await findUserByEmail(email);
  return !!user?.hashedPassword;
};

export const createNewUser = async (userData: UserCreationData): Promise<AdapterUser> => {
  const role = await getRoleByCode(ROLE.PERSONAL_USER);

  const [newUser] = await db
    .insert(users)
    .values({
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      emailVerified: userData.emailVerified ?? null,
      image: userData.image ?? null,
      roleId: role.id,
    })
    .returning();

  return newUser;
};

export const findAccountByUserIdAndProvider = async (userId: string, provider: string) => {
  return db.query.accounts.findFirst({
    where: and(eq(accounts.userId, userId), eq(accounts.provider, provider)),
  });
};

export const isAccountAlreadyLinked = async (userId: string, provider: string): Promise<boolean> => {
  const account = await findAccountByUserIdAndProvider(userId, provider);
  return !!account;
};
