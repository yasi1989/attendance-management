'use server';
import { db } from '@/lib/db/drizzle';
import z from 'zod';
import { UserSchema } from '../lib/formSchema';
import { ActionStateResult } from '@/lib/actionTypes';
import { eq } from 'drizzle-orm';
import { users } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';
import { URLS } from '@/consts/urls';
import { actionErrorHandler } from '@/lib/errorHandler';

export const editUserAction = async (values: z.infer<typeof UserSchema>): Promise<ActionStateResult> => {
  try {
    const { id, name, email, roleId, companyId } = values;
    const [currentUser, existingUser] = await Promise.all([
      db.query.users.findFirst({ where: (users, { eq }) => eq(users.id, id) }),
      db.query.users.findFirst({
        where: (users, { eq, and, ne }) => and(eq(users.email, email), ne(users.id, id)),
      }),
    ]);
    if (!currentUser) {
      return { success: false, error: 'ユーザーが見つかりませんでした。' };
    }
    if (currentUser.email !== email && existingUser) {
      return { success: false, error: 'メールアドレスが重複しています。' };
    }
    await db
      .update(users)
      .set({
        name,
        email,
        roleId,
        companyId,
      })
      .where(eq(users.id, id));
    revalidatePath(URLS.SYSTEM_USERS);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const deleteUserAction = async (id: string): Promise<ActionStateResult> => {
  try {
    const user = await db.query.users.findFirst({ where: eq(users.id, id) });
    if (!user) {
      return { success: false, error: 'ユーザーが見つかりませんでした。' };
    }
    await db.delete(users).where(eq(users.id, id));
    revalidatePath(URLS.SYSTEM_USERS);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
