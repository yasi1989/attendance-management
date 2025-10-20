import CommonSkeleton from '@/components/layout/CommonSkeleton';
import { Suspense } from 'react';
import ExpenseContainer from './container';
import { STATUS_WITH_ALL } from '@/consts/status';
import { EXPENSE_CATEGORIES_WITH_ALL } from '@/consts/expense';
import { isValidStatusWithAll } from '@/lib/status';
import { isValidExpenseType } from '@/lib/expense';
import { isValidMonth, isValidYear } from '@/lib/date';

type ExpensePageProps = {
  params: Promise<{
    year: string;
    month: string;
    status: string;
    expense: string;
    params: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const ExpensePage = async ({ params, searchParams }: ExpensePageProps) => {
  const now = new Date();

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  let year: number;
  let month: number;
  let status: string;
  let expenseType: string;

  if (resolvedParams.params) {
    year = resolvedParams.params[0] ? Number(resolvedParams.params[0]) : now.getFullYear();
    month = resolvedParams.params[1] ? Number(resolvedParams.params[1]) : now.getMonth() + 1;
    status = resolvedParams.params[2] ? resolvedParams.params[2] : STATUS_WITH_ALL.ALL.value;
    expenseType = resolvedParams.params[3] ? resolvedParams.params[3] : EXPENSE_CATEGORIES_WITH_ALL.ALL.value;
  } else {
    year = resolvedParams.year ? Number(resolvedParams.year) : now.getFullYear();
    month = resolvedParams.month ? Number(resolvedParams.month) : now.getMonth() + 1;
    status = resolvedParams.status ? resolvedParams.status : STATUS_WITH_ALL.ALL.value;
    expenseType = resolvedParams.expense ? resolvedParams.expense : EXPENSE_CATEGORIES_WITH_ALL.ALL.value;
  }

  if (resolvedSearchParams.year && typeof resolvedSearchParams.year === 'string') {
    year = Number(resolvedSearchParams.year);
  }
  if (resolvedSearchParams.month && typeof resolvedSearchParams.month === 'string') {
    month = Number(resolvedSearchParams.month);
  }
  if (resolvedSearchParams.status && typeof resolvedSearchParams.status === 'string') {
    status = resolvedSearchParams.status;
  }
  if (resolvedSearchParams.expense && typeof resolvedSearchParams.expense === 'string') {
    expenseType = resolvedSearchParams.expense;
  }

  const validatedYear = isValidYear(year) ? year : now.getFullYear();
  const validatedMonth = isValidMonth(month) ? month : now.getMonth() + 1;
  const validatedStatus = isValidStatusWithAll(status) ? status : STATUS_WITH_ALL.ALL.value;
  const validatedExpenseType = isValidExpenseType(expenseType) ? expenseType : EXPENSE_CATEGORIES_WITH_ALL.ALL.value;

  return (
    <Suspense fallback={<CommonSkeleton />}>
      <ExpenseContainer
        year={validatedYear}
        month={validatedMonth}
        status={validatedStatus}
        expenseType={validatedExpenseType}
      />
    </Suspense>
  );
};

export default ExpensePage;
