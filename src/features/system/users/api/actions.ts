'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { URLS } from '@/consts/urls';
import { requireUserManagement } from '@/features/system/users/lib/roleGuard';
import { ActionStateResult } from '@/lib/actionTypes';
import {
  ensureCompanyAdminHasCompany,
  ensureUniqueCompanyAdmin,
  ensureUserInCompany,
  ensureUserNotDepartmentManager,
  ensureUserNotInApprovalFlows,
} from '@/lib/actionValidate';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { UserSchema } from '../lib/formSchema';

export const editUserAction = async (values: z.infer<typeof UserSchema>): Promise<ActionStateResult> => {
  try {
    const { id, name, email, roleId, companyId } = values;

    const authResult = await requireUserManagement();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const [currentUser, existingUser] = await Promise.all([
      db.query.users.findFirst({ where: (users, { eq }) => eq(users.id, id) }),
      db.query.users.findFirst({
        where: (users, { eq, and, ne }) => and(eq(users.email, email), ne(users.id, id)),
      }),
    ]);

    if (!currentUser) return { success: false, error: 'ユーザーが見つかりませんでした。' };
    if (currentUser.email !== email && existingUser) {
      return { success: false, error: 'メールアドレスが重複しています。' };
    }

    const companyRequiredError = await ensureCompanyAdminHasCompany(roleId, companyId);
    if (companyRequiredError) return companyRequiredError;

    if (companyId && roleId) {
      const companyAdminError = await ensureUniqueCompanyAdmin(roleId, companyId, id);
      if (companyAdminError) return companyAdminError;
    }

    await db.update(users).set({ name, email, roleId, companyId }).where(eq(users.id, id));

    revalidatePath(URLS.SYSTEM_USERS, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const deleteUserAction = async (id: string): Promise<ActionStateResult> => {
  try {
    const authResult = await requireUserManagement();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const userError = await ensureUserInCompany(id);
    if (userError) return userError;

    const approvalError = await ensureUserNotInApprovalFlows(id);
    if (approvalError) return approvalError;

    const managerError = await ensureUserNotDepartmentManager(id);
    if (managerError) return managerError;

    const result = await db.delete(users).where(eq(users.id, id));
    if (result.rowCount === 0) {
      return { success: false, error: 'ユーザーが見つかりませんでした。' };
    }
    revalidatePath(URLS.SYSTEM_USERS, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
