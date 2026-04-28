'use server';

import { head, put } from '@vercel/blob';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { URLS } from '@/consts/urls';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { expenses } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { Result } from '@/lib/result';
import { ExpenseFormSchema } from '../dialogs/lib/formSchema';
import { requireExpenseAccess } from '../lib/roleGuard';

const uploadReceipt = async (userId: string, file: FileList): Promise<string | null> => {
  if (!file || file.length === 0) return null;

  const receiptFile = file[0];
  const timestamp = Date.now();
  const filename = `receipts/${userId}/${timestamp}-${receiptFile.name}`;

  const blob = await put(filename, receiptFile, {
    access: 'private',
    addRandomSuffix: true,
  });

  return blob.url;
};

export const createExpenseAction = async (values: z.infer<typeof ExpenseFormSchema>): Promise<ActionStateResult> => {
  try {
    const authResult = await requireExpenseAccess();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const user = authResult.data;
    const { expenseType, expenseDate, amount, description, receiptFile, routes } = values;

    const receiptUrl = receiptFile ? await uploadReceipt(user.id, receiptFile) : null;

    await db.insert(expenses).values({
      userId: user.id,
      expenseType,
      expenseDate,
      amount: String(amount),
      description,
      receiptUrl,
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

    const receiptUrl = receiptFile ? await uploadReceipt(user.id, receiptFile) : null;

    const result = await db
      .update(expenses)
      .set({
        expenseType,
        expenseDate,
        amount: String(amount),
        description,
        ...(receiptUrl !== null && { receiptUrl }),
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

export const getReceiptUrlAction = async (receiptUrl: string): Promise<Result<string>> => {
  try {
    const authResult = await requireExpenseAccess();
    if (!authResult.success) return { success: false, error: authResult.error };

    const blobDetails = await head(receiptUrl);
    return { success: true, data: blobDetails.downloadUrl };
  } catch (error) {
    console.error(error);
    return { success: false, error: new Error('ダウンロードURLの取得に失敗しました。') };
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
