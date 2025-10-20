import { StatusTypeWithAll } from '@/types/statusType';
import { ExpenseItem } from '../type/ExpenseType';
import { expenseData } from '../const/mockData';
import { STATUS_WITH_ALL } from '@/consts/status';
import { EXPENSE_CATEGORIES_WITH_ALL } from '@/consts/expense';
import { ExpenseCategoryTypeWithAll } from '@/types/expense';

const getFixedExpensesData = (
  year: number,
  month: number,
  status: StatusTypeWithAll,
  expenseType: ExpenseCategoryTypeWithAll,
): ExpenseItem[] => {
  return expenseData.filter((item) => {
    const matchesYearMonth = filterByYearMonth(item.expenseDate, year, month);
    const matchesStatus = status === STATUS_WITH_ALL.ALL.value || item.status === status;
    const matchesExpenseType = expenseType === EXPENSE_CATEGORIES_WITH_ALL.ALL.value || item.expenseType === expenseType;
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
  expenseType: ExpenseCategoryTypeWithAll,
): Promise<ExpenseItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getFixedExpensesData(year, month, status, expenseType);
};
