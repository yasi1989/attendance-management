import { StatusType } from '@/types/statusType';
import { expenseData } from '../history/const/mockData';
import { ExpenseItem, ExpenseType } from '../history/type/expenseDataType';

const getFixedExpensesData = (
  year: number,
  month: number,
  status: StatusType,
  expenseType: ExpenseType,
): ExpenseItem[] => {
  return expenseData.filter((item) => {
    const matchesYearMonth = filterByYearMonth(item.targetMonth, year, month);
    const matchesStatus = status === 'All' || item.statusCode === status;
    const matchesExpenseType = expenseType === 'All' || item.expenseType === expenseType;
    return matchesYearMonth && matchesStatus && matchesExpenseType;
  });
};

const filterByYearMonth = (targetDate: Date, year: number, month: number): boolean => {
  return targetDate.getFullYear() === year && targetDate.getMonth() + 1 === month;
};

export const fetchExpenses = async (
  year: number,
  month: number,
  status: StatusType,
  expenseType: ExpenseType,
): Promise<ExpenseItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getFixedExpensesData(year, month, status, expenseType);
};
