'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { URLS } from '@/consts/urls';
import { requireCompanyAdmin } from '@/features/auth/lib/authRoleUtils';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { EmployeeSchema } from '../lib/formSchema';

export const editEmployeeAction = async (values: z.infer<typeof EmployeeSchema>): Promise<ActionStateResult> => {
  try {
    const { id, name, email, departmentId, roleId } = values;
    await requireCompanyAdmin();
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
        departmentId,
        roleId,
      })
      .where(eq(users.id, id));
    revalidatePath(URLS.ROOT, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const deleteEmployeeAction = async (id: string): Promise<ActionStateResult> => {
  try {
    await requireCompanyAdmin();
    const result = await db.delete(users).where(eq(users.id, id));
    if (result.rowCount === 0) {
      return { success: false, error: 'ユーザーが見つかりませんでした。' };
    }
    revalidatePath(URLS.ROOT, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
