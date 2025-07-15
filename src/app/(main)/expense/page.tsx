import CommonSkeleton from '@/components/CommonSkeleton';
import { isValidMonth, isValidYear } from '@/features/attendance/calendar/lib/calenderUtils';
import { Suspense } from 'react';
import { StatusType } from '@/types/statusType';
import { ExpenseType } from '@/features/expense/history/type/expenseDataType';
import ExpenseContainer from './container';

type ExpensePageProps = {
  params: Promise<{
    year: string;
    month: string;
    status: string;
    expenseType: string;
    params: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const isValidStatus = (status: string): status is StatusType => {
  return ['Submitted', 'Approved', 'Rejected', 'All'].includes(status);
};

const isValidExpenseType = (expenseType: string): expenseType is ExpenseType => {
  return ['All', 'Transport', 'General'].includes(expenseType);
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
    year = resolvedParams.params[0] ? Number.parseInt(resolvedParams.params[0], 10) : now.getFullYear();
    month = resolvedParams.params[1] ? Number.parseInt(resolvedParams.params[1], 10) : now.getMonth() + 1;
    status = resolvedParams.params[2] ? resolvedParams.params[2] : 'Submitted';
    expenseType = resolvedParams.params[3] ? resolvedParams.params[3] : 'All';
  } else {
    year = resolvedParams.year ? Number.parseInt(resolvedParams.year, 10) : now.getFullYear();
    month = resolvedParams.month ? Number.parseInt(resolvedParams.month, 10) : now.getMonth() + 1;
    status = resolvedParams.status ? resolvedParams.status : 'Submitted';
    expenseType = resolvedParams.expenseType ? resolvedParams.expenseType : 'All';
  }

  if (resolvedSearchParams.year && typeof resolvedSearchParams.year === 'string') {
    year = Number.parseInt(resolvedSearchParams.year, 10);
  }
  if (resolvedSearchParams.month && typeof resolvedSearchParams.month === 'string') {
    month = Number.parseInt(resolvedSearchParams.month, 10);
  }
  if (resolvedSearchParams.status && typeof resolvedSearchParams.status === 'string') {
    status = resolvedSearchParams.status;
  }
  if (resolvedSearchParams.expenseType && typeof resolvedSearchParams.expenseType === 'string') {
    expenseType = resolvedSearchParams.expenseType;
  }

  const validatedYear = isValidYear(year) ? year : now.getFullYear();
  const validatedMonth = isValidMonth(month) ? month : now.getMonth() + 1;
  const validatedStatus = isValidStatus(status) ? status : 'Submitted';
  const validatedExpenseType = isValidExpenseType(expenseType) ? expenseType : 'All';

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
