import { StatusType } from '@/types/statusType';

export const EXPENSE_TABLE_LABELS = {
  ja: {
    EXPENSE_DATE: '発生日',
    REQUEST_DATE: '申請日',
    STATUS: '状態',
    EXPENSE_TYPE: '経費',
    AMOUNT: '金額',
    DESCRIPTION: '説明',
    RECEIPT: '領収証',
  },
} as const;

export const EXPENSE_TABLE_CONFIG = {
  FIELD_LIMITS: {
    DESCRIPTION_MAX_LENGTH: 20,
  },
} as const;

export const EXPENSE_TABLE_UTILS = {
  canSubmit: (status: StatusType) => {
    const submittableStatuses: StatusType[] = ['Rejected', 'Draft'];
    return submittableStatuses.includes(status);
  },
} as const;
