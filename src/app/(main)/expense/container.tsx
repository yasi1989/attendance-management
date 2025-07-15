import { fetchExpenses } from '@/features/expense/services/fetchExpense';
import { StatusType } from '@/types/statusType';
import ExpensePresentational from './presentational';
import { ExpenseType } from '@/features/expense/history/type/expenseDataType';

type ExpenseContainerProps = {
  year: number;
  month: number;
  status: StatusType;
  expenseType: ExpenseType;
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
