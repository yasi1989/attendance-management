'use server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { URLS } from '@/consts/urls';
import { ActionStateResult } from '@/lib/actionTypes';
import {
  ensureUserInCompany,
  ensureUserNotDepartmentManager,
  ensureUserNotInApprovalFlows,
} from '@/lib/actionValidate';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { checkDepartmentAssignable, ensureNonSystemAdminRole } from '../lib/actionValidate';
import { EmployeeSchema } from '../lib/formSchema';
import { requireEmployeeManagement } from '../lib/roleGuard';

export const editEmployeeAction = async (values: z.infer<typeof EmployeeSchema>): Promise<ActionStateResult> => {
  try {
    const { id, name, email, departmentId, roleId } = values;
    const user = await requireEmployeeManagement();
    const [deptError, roleError] = await Promise.all([
      checkDepartmentAssignable(departmentId, user.companyId),
      ensureNonSystemAdminRole(roleId, user.companyId),
    ]);
    if (deptError) return deptError;
    if (roleError) return roleError;

    const [currentUser, existingUser] = await Promise.all([
      db.query.users.findFirst({
        where: (users, { eq, and }) => and(eq(users.id, id), eq(users.companyId, user.companyId)),
      }),
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
    const user = await requireEmployeeManagement();

    const userError = await ensureUserInCompany(id, user.companyId);
    if (userError) return userError;

    const approvalError = await ensureUserNotInApprovalFlows(id);
    if (approvalError) return approvalError;

    const managerError = await ensureUserNotDepartmentManager(id, user.companyId);
    if (managerError) return managerError;

    const result = await db.delete(users).where(and(eq(users.id, id), eq(users.companyId, user.companyId)));
    if (result.rowCount === 0) {
      return { success: false, error: 'ユーザーが見つかりませんでした。' };
    }
    revalidatePath(URLS.ROOT, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
