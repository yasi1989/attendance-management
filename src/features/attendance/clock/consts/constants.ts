import { STATUS } from '@/consts/status';
import { ClockStatus } from '../types/types';
export const CLOCK_STATUS_TYPE = {
  NOT_STARTED: 'not_started',
  CLOCKED_IN: 'clocked_in',
  CLOCKED_OUT: 'clocked_out',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  SYSTEM_ADMIN: 'system_admin',
} as const;

export const CLOCK_USER_TYPE = {
  SYSTEM_ADMIN: 'system_admin',
  WITH_COMPANY: 'with_company',
  PERSONAL: 'personal',
} as const;

export const CLOCK_BUTTON_LOCKED_STATUSES = new Set<ClockStatus['type']>([
  CLOCK_STATUS_TYPE.SUBMITTED,
  CLOCK_STATUS_TYPE.APPROVED,
  CLOCK_STATUS_TYPE.CLOCKED_OUT,
  CLOCK_STATUS_TYPE.SYSTEM_ADMIN,
]);

export const CLOCK_BUTTON_LOCKED_LABELS: Partial<Record<ClockStatus['type'], string>> = {
  [CLOCK_STATUS_TYPE.SUBMITTED]: STATUS.SUBMITTED.label,
  [CLOCK_STATUS_TYPE.APPROVED]: STATUS.APPROVED.label,
  [CLOCK_STATUS_TYPE.CLOCKED_OUT]: '退勤済み',
  [CLOCK_STATUS_TYPE.SYSTEM_ADMIN]: '打刻不可',
};

export const CLOCK_ACTION_ERROR_MESSAGES: Record<string, string> = {
  ALREADY_CLOCKED_IN: '既に出勤済みです',
  ALREADY_CLOCKED_OUT: '既に退勤済みです',
  ALREADY_SUBMITTED: STATUS.SUBMITTED.label + 'のため変更できません',
  ALREADY_APPROVED: STATUS.APPROVED.label + 'のため変更できません',
  NOT_CLOCKED_IN: '出勤打刻がありません',
  UNAUTHORIZED: '認証エラーが発生しました',
};

export const CLOCK_BLOCKED_APPROVAL_STATUSES = {
  [STATUS.APPROVED.value]: STATUS.APPROVED.label,
  [STATUS.SUBMITTED.value]: STATUS.SUBMITTED.label,
} as const;
