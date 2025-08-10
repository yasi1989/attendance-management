import { fetchExpenses } from '@/features/expense/services/fetchExpense';
import { StatusTypeWithAll } from '@/types/statusType';
import ExpensePresentational from './presentational';
import { ExpenseTypeFilter } from '@/features/expense/type/ExpenseType';

type ExpenseContainerProps = {
  year: number;
  month: number;
  status: StatusTypeWithAll;
  expenseType: ExpenseTypeFilter;
};

const ExpenseContainer = async ({ year, month, status, expenseType }: ExpenseContainerProps) => {
  const expenseData = await fetchExpenses(year, month, status, expenseType);
  return (
    <ExpensePresentational
      expenseData={expenseData}
      currentYear={year}
      currentMonth={month}
      currentStatus={status}
      currentExpenseType={expenseType}
    />
  );
};

export default ExpenseContainer;
