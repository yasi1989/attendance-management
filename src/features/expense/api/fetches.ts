'use server';

import { and, between, eq } from 'drizzle-orm';
import { EXPENSE_CATEGORIES_WITH_ALL } from '@/consts/expense';
import { STATUS, STATUS_WITH_ALL } from '@/consts/status';
import { ExpenseWithApproval } from '@/lib/actionTypes';
import { getYearMonthRange } from '@/lib/date';
import { db } from '@/lib/db/drizzle';
import { expenses } from '@/lib/db/schema';
import { Result } from '@/lib/result';
import { ExpenseCategoryTypeWithAll } from '@/types/expense';
import { StatusTypeWithAll } from '@/types/statusType';
import { requireExpenseAccess } from '../lib/roleGuard';

export const fetchExpenses = async (
  year: number,
  month: number,
  status: StatusTypeWithAll,
  expenseType: ExpenseCategoryTypeWithAll,
): Promise<Result<ExpenseWithApproval[]>> => {
  const authResult = await requireExpenseAccess();
  if (!authResult.success) return { success: false, error: authResult.error };

  const user = authResult.data;
  const { startDate, endDate } = getYearMonthRange(year, month);

  try {
    const conditions = [eq(expenses.userId, user.id), between(expenses.expenseDate, startDate, endDate)];

    if (expenseType !== EXPENSE_CATEGORIES_WITH_ALL.ALL.value) {
      conditions.push(eq(expenses.expenseType, expenseType));
    }

    const result = await db.query.expenses.findMany({
      where: and(...conditions),
      with: {
        groupExpenseApproval: true,
      },
      orderBy: (t, { desc }) => [desc(t.expenseDate)],
    });

    const filtered = result.filter((expense) => {
      if (status === STATUS_WITH_ALL.ALL.value) return true;
      if (status === STATUS.PENDING.value) return expense.groupExpenseApproval === null;
      return expense.groupExpenseApproval?.statusCode === status;
    });

    return { success: true, data: filtered };
  } catch (error) {
    console.error('経費データ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('経費データ取得に失敗しました。') };
  }
};
