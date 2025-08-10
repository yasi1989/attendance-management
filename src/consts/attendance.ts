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

export const LEAVES_LIST = [...Object.values(LEAVES).map((status) => status.value)] as const;
export const ATTENDANCES_LIST = [...Object.values(ATTENDANCES).map((status) => status.value)] as const;
export const HALF_DAYS_LIST = [...Object.values(HALF_DAYS).map((status) => status.value)] as const;