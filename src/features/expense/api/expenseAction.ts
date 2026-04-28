'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { URLS } from '@/consts/urls';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { expenses } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { ExpenseFormSchema } from '../dialogs/lib/formSchema';
import { requireExpenseAccess } from '../lib/roleGuard';

export const createExpenseAction = async (values: z.infer<typeof ExpenseFormSchema>): Promise<ActionStateResult> => {
  try {
    const authResult = await requireExpenseAccess();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const user = authResult.data;
    const { expenseType, expenseDate, amount, description, receiptFile, routes } = values;

    await db.insert(expenses).values({
      userId: user.id,
      expenseType,
      expenseDate,
      amount: String(amount),
      description,
      receiptUrl: receiptFile ? URL.createObjectURL(receiptFile[0]) : null,
      routeDetails: routes ?? null,
    });

    revalidatePath(URLS.EXPENSE, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const updateExpenseAction = async (
  expenseId: string,
  values: z.infer<typeof ExpenseFormSchema>,
): Promise<ActionStateResult> => {
  try {
    const authResult = await requireExpenseAccess();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const user = authResult.data;
    const { expenseType, expenseDate, amount, description, receiptFile, routes } = values;

    const result = await db
      .update(expenses)
      .set({
        expenseType,
        expenseDate,
        amount: String(amount),
        description,
        receiptUrl: receiptFile ? URL.createObjectURL(receiptFile[0]) : null,
        routeDetails: routes ?? null,
      })
      .where(and(eq(expenses.id, expenseId), eq(expenses.userId, user.id)));

    if (result.rowCount === 0) {
      return { success: false, error: '経費データが見つかりませんでした。' };
    }

    revalidatePath(URLS.EXPENSE, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const deleteExpenseAction = async (expenseId: string): Promise<ActionStateResult> => {
  try {
    const authResult = await requireExpenseAccess();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const user = authResult.data;

    const expense = await db.query.expenses.findFirst({
      where: (t, { and, eq }) => and(eq(t.id, expenseId), eq(t.userId, user.id)),
    });

    if (!expense) {
      return { success: false, error: '経費データが見つかりませんでした。' };
    }

    if (expense.groupExpenseApprovalId !== null) {
      return { success: false, error: '申請済みの経費は削除できません。' };
    }

    const result = await db.delete(expenses).where(and(eq(expenses.id, expenseId), eq(expenses.userId, user.id)));

    if (result.rowCount === 0) {
      return { success: false, error: '経費データが見つかりませんでした。' };
    }

    revalidatePath(URLS.EXPENSE, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
