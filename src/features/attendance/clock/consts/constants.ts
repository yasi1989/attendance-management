import { AttendanceStatus } from '../types/types';

export const LOCKED_STATUSES = new Set<AttendanceStatus['type']>([
  'submitted',
  'approved',
  'clocked_out',
  'system_admin',
]);

export const LOCKED_LABELS: Partial<Record<AttendanceStatus['type'], string>> = {
  submitted: '申請済み',
  approved: '承認済み',
  clocked_out: '退勤済み',
  system_admin: '打刻不可',
};

export const CLOCK_ERROR_MESSAGES: Record<string, string> = {
  ALREADY_CLOCKED_IN: '既に出勤済みです',
  ALREADY_CLOCKED_OUT: '既に退勤済みです',
  ALREADY_SUBMITTED: '申請済みのため変更できません',
  ALREADY_APPROVED: '承認済みのため変更できません',
  NOT_CLOCKED_IN: '出勤打刻がありません',
  UNAUTHORIZED: '認証エラーが発生しました',
};
