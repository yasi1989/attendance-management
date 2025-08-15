import { EXPENSE_CATEGORIES, EXPENSE_CATEGORIES_WITH_ALL_LIST } from '@/consts/expense';
import { ExpenseCategoryTypeWithAll } from '@/types/expense';

export const isValidExpenseType = (expenseType: string): expenseType is ExpenseCategoryTypeWithAll => {
  return EXPENSE_CATEGORIES_WITH_ALL_LIST.includes(expenseType as ExpenseCategoryTypeWithAll);
};

export const getExpenseCategoryByValue = (value: string) => {
  return Object.values(EXPENSE_CATEGORIES).find((category) => category.value === value);
};
