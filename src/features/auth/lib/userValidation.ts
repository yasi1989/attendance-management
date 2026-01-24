import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';

export interface ExistingUserCheck {
  exists: boolean;
  hasPassword: boolean;
  userId?: string;
}

export const checkExistingUser = async (email: string): Promise<ExistingUserCheck> => {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!existingUser) {
    return { exists: false, hasPassword: false };
  }

  return {
    exists: true,
    hasPassword: !!existingUser.hashedPassword,
    userId: existingUser.id,
  };
};
