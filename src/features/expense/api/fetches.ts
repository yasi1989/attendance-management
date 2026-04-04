'use server';

import { and, between, eq, isNull, or } from 'drizzle-orm';
import { EXPENSE_CATEGORIES_WITH_ALL } from '@/consts/expense';
import { STATUS_WITH_ALL } from '@/consts/status';
import { getYearMonthRange } from '@/lib/date';
import { db } from '@/lib/db/drizzle';
import { expenses, groupExpenseApprovals } from '@/lib/db/schema';
import { ExpenseCategoryTypeWithAll } from '@/types/expense';
import { StatusTypeWithAll } from '@/types/statusType';
import { requireExpenseAccess } from '../lib/roleGuard';

export const fetchExpenses = async (
  year: number,
  month: number,
  status: StatusTypeWithAll,
  expenseType: ExpenseCategoryTypeWithAll,
) => {
  const user = await requireExpenseAccess();
  const { startDate, endDate } = getYearMonthRange(year, month);

  const conditions = [
    eq(groupExpenseApprovals.userId, user.id),
    eq(groupExpenseApprovals.companyId, user.companyId),
    or(isNull(groupExpenseApprovals.submittedAt), between(groupExpenseApprovals.submittedAt, startDate, endDate)),
  ];

  if (status !== STATUS_WITH_ALL.ALL.value) {
    conditions.push(eq(groupExpenseApprovals.statusCode, status));
  }

  return db.query.groupExpenseApprovals.findMany({
    where: and(...conditions),
    with: {
      expenses:
        expenseType !== EXPENSE_CATEGORIES_WITH_ALL.ALL.value ? { where: eq(expenses.expenseType, expenseType) } : true,
    },
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  });
};
