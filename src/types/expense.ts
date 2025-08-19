import { EXPENSE_CATEGORIES, EXPENSE_CATEGORIES_WITH_ALL } from '@/consts/expense';

export type ExpenseCategoryType = (typeof EXPENSE_CATEGORIES)[keyof typeof EXPENSE_CATEGORIES]['value'];
export type ExpenseCategoryTypeWithAll =
  (typeof EXPENSE_CATEGORIES_WITH_ALL)[keyof typeof EXPENSE_CATEGORIES_WITH_ALL]['value'];
