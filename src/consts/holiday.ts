export const HOLIDAY_CATEGORIES = {
  NATIONAL: { value: 'National', label: '国民の祝日' },
  COMPANY: { value: 'Company', label: '社内休日' },
} as const;

export const HOLIDAY_CATEGORIES_WITH_ALL = {
  ALL: { value: 'All', label: 'すべて' },
  ...HOLIDAY_CATEGORIES,
} as const;

export const HOLIDAY_CATEGORIES_LIST = [
  ...Object.values(HOLIDAY_CATEGORIES).map((category) => category.value),
] as const;
export const HOLIDAY_CATEGORIES_WITH_ALL_LIST = [
  ...Object.values(HOLIDAY_CATEGORIES_WITH_ALL).map((category) => category.value),
] as const;
