export const WEEKDAYS_WITH_STYLES = [
  { name: '日', fullName: '日曜日', textColor: 'text-red-600 dark:text-red-400' },
  { name: '月', fullName: '月曜日', textColor: 'text-gray-700 dark:text-gray-300' },
  { name: '火', fullName: '火曜日', textColor: 'text-gray-700 dark:text-gray-300' },
  { name: '水', fullName: '水曜日', textColor: 'text-gray-700 dark:text-gray-300' },
  { name: '木', fullName: '木曜日', textColor: 'text-gray-700 dark:text-gray-300' },
  { name: '金', fullName: '金曜日', textColor: 'text-gray-700 dark:text-gray-300' },
  { name: '土', fullName: '土曜日', textColor: 'text-blue-600 dark:text-blue-400' },
] as const;

export const VALIDATION_CONSTANTS = {
  YEAR: {
    MIN: 2020,
    MAX: 2040,
  },
  MONTH: {
    MIN: 1,
    MAX: 12,
  },
} as const;
