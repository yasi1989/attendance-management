export const EXPENSE_CATEGORIES = {
  TRANSPORT: { value: 'Transport', label: '交通費' },
  GENERAL: { value: 'General', label: '一般経費' },
} as const;

export const EXPENSE_CATEGORIES_WITH_ALL = {
  ALL: { value: 'All', label: 'すべて' },
  ...EXPENSE_CATEGORIES,
} as const;

export const EXPENSE_CATEGORIES_LIST = [
  ...Object.values(EXPENSE_CATEGORIES).map((category) => category.value),
] as const;
export const EXPENSE_CATEGORIES_WITH_ALL_LIST = [
  ...Object.values(EXPENSE_CATEGORIES_WITH_ALL).map((category) => category.value),
] as const;
