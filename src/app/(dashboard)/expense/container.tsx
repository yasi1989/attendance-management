import { fetchExpenses } from '@/features/expense/api/fetches';
import { ExpenseCategoryTypeWithAll } from '@/types/expense';
import { StatusTypeWithAll } from '@/types/statusType';
import ExpensePresentational from './presentational';

type ExpenseContainerProps = {
  year: number;
  month: number;
  status: StatusTypeWithAll;
  expenseType: ExpenseCategoryTypeWithAll;
};

const ExpenseContainer = async ({ year, month, status, expenseType }: ExpenseContainerProps) => {
  const result = await fetchExpenses(year, month, status, expenseType);
  if (!result.success) throw new Error(result.error.message);

  return (
    <ExpensePresentational
      expenseData={result.data}
      currentYear={year}
      currentMonth={month}
      currentStatus={status}
      currentExpenseType={expenseType}
    />
  );
};

export default ExpenseContainer;
