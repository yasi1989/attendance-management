export const REQUEST_CATEGORIES = {
  ATTENDANCE: { value: 'Attendance', label: '勤怠' },
  EXPENSE: { value: 'Expense', label: '経費' },
} as const;

export const REQUEST_CATEGORIES_LIST = [...Object.values(REQUEST_CATEGORIES).map((category) => category.value)] as const;