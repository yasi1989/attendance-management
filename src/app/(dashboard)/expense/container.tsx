import { fetchExpenses } from '@/features/expense/services/fetchExpense';
import { StatusTypeWithAll } from '@/types/statusType';
import ExpensePresentational from './presentational';
import { ExpenseCategoryTypeWithAll } from '@/types/expense';

type ExpenseContainerProps = {
  year: number;
  month: number;
  status: StatusTypeWithAll;
  expenseType: ExpenseCategoryTypeWithAll;
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
