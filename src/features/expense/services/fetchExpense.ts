import { StatusTypeWithAll } from '@/types/statusType';
import { ExpenseItem, ExpenseTypeFilter } from '../type/ExpenseType';
import { expenseData } from '../const/mockData';
import { STATUS_WITH_ALL } from '@/consts/status';

const getFixedExpensesData = (
  year: number,
  month: number,
  status: StatusTypeWithAll,
  expenseType: ExpenseTypeFilter,
): ExpenseItem[] => {
  return expenseData.filter((item) => {
    const matchesYearMonth = filterByYearMonth(item.expenseDate, year, month);
    const matchesStatus = status === STATUS_WITH_ALL.ALL.value || item.status === status;
    const matchesExpenseType = expenseType === STATUS_WITH_ALL.ALL.value || item.expenseType === expenseType;
    return matchesYearMonth && matchesStatus && matchesExpenseType;
  });
};

const filterByYearMonth = (targetDate: Date, year: number, month: number): boolean => {
  return targetDate.getFullYear() === year && targetDate.getMonth() + 1 === month;
};

export const fetchExpenses = async (
  year: number,
  month: number,
  status: StatusTypeWithAll,
  expenseType: ExpenseTypeFilter,
): Promise<ExpenseItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getFixedExpensesData(year, month, status, expenseType);
};
