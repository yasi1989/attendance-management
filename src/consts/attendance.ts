export const LEAVES = {
  PAID: { value: 'Paid', label: '有給' },
  ABSENCE: { value: 'Absence', label: '欠勤' },
  SPECIAL: { value: 'Special', label: '特別' },
} as const;
export const ATTENDANCES = {
  WORK: { value: 'Work', label: '出勤' },
  ...LEAVES,
} as const;

export const HALF_DAYS = {
  AM: { value: 'Am', label: '午前' },
  PM: { value: 'Pm', label: '午後' },
} as const;

export const WORK_RULES = {
  REGULAR_WORK_MINUTES: 8 * 60,
  DEFAULT_BREAK_MINUTES: 0,
} as const;

export const LEAVES_LIST = [LEAVES.PAID.value, LEAVES.ABSENCE.value, LEAVES.SPECIAL.value] as const;
export const ATTENDANCES_LIST = [ATTENDANCES.WORK.value, ...LEAVES_LIST] as const;
export const HALF_DAYS_LIST = [HALF_DAYS.AM.value, HALF_DAYS.PM.value] as const;
