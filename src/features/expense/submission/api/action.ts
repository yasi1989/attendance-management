'use server';

import { and, eq, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { STATUS } from '@/consts/status';
import { URLS } from '@/consts/urls';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { expenseGroupApprovalSteps, expenses, groupExpenseApprovals } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { resolveApprover } from '@/lib/resolveApprover';
import { requireExpenseAccess } from '../../lib/roleGuard';
import { BatchExpenseSchema } from '../lib/formSchema';

export const submitExpensesAction = async (
  expenseIds: string[],
  values: z.infer<typeof BatchExpenseSchema>,
): Promise<ActionStateResult> => {
  try {
    const authResult = await requireExpenseAccess();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const user = authResult.data;

    if (expenseIds.length === 0) return { success: false, error: '申請対象を選択してください' };

    if (!user.departmentId) {
      return { success: false, error: '部署が設定されていません。管理者にお問い合わせください。' };
    }

    const targetExpenses = await db.query.expenses.findMany({
      where: and(eq(expenses.userId, user.id), inArray(expenses.id, expenseIds)),
      with: {
        groupExpenseApproval: true,
      },
    });

    if (targetExpenses.length !== expenseIds.length) {
      return { success: false, error: '申請対象の経費が見つかりませんでした' };
    }

    const hasNonRejected = targetExpenses.some(
      (e) =>
        e.groupExpenseApproval !== null &&
        (e.groupExpenseApproval.statusCode === STATUS.SUBMITTED.value ||
          e.groupExpenseApproval.statusCode === STATUS.APPROVED.value),
    );
    if (hasNonRejected) return { success: false, error: '申請済みの経費が含まれています' };

    const approvers = await resolveApprover(user);
    if (approvers.length === 0) {
      return { success: false, error: '承認者が見つかりませんでした。管理者にお問い合わせください。' };
    }

    const [group] = await db
      .insert(groupExpenseApprovals)
      .values({
        userId: user.id,
        companyId: user.companyId,
        statusCode: STATUS.SUBMITTED.value,
        submittedAt: new Date(),
        purpose: values.comment,
      })
      .returning();

    await db.insert(expenseGroupApprovalSteps).values(
      approvers.map((approver) => ({
        groupExpenseApprovalId: group.id,
        stepOrder: approver.stepOrder,
        approverId: approver.userId,
        statusCode: STATUS.SUBMITTED.value,
      })),
    );

    await db.update(expenses).set({ groupExpenseApprovalId: group.id }).where(inArray(expenses.id, expenseIds));

    revalidatePath(URLS.EXPENSE, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
