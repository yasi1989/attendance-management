import { StatusType } from '@/types/statusType';

export const TABLE_STYLES = {
  LAYOUT: {
    ACTIONS_CELL: 'flex items-center justify-center gap-1',
  },

  INTERACTIVE: {
    SORT_BUTTON: 'p-0 h-auto hover:bg-transparent',
    CHECKBOX: 'border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600',
  },

  SIZING: {
    ICON: 'h-3 w-3 md:h-4 md:w-4',
  },
} as const;

export const TABLE_FORMATS = {
  DATE: 'yyyy-MM-dd',
} as const;

export const TABLE_LABELS = {
  ja: {
    ACTIONS: '操作',
    SELECT_ALL: 'すべて選択',
    SELECT_ROW: '行を選択',
  },
} as const;

export const EXPENSE_TABLE_UTILS = {
  status: {
    canSubmit: (status: StatusType) => {
      const submittableStatuses: StatusType[] = ['Rejected', 'Draft'];
      return submittableStatuses.includes(status);
    },
  },
} as const;
