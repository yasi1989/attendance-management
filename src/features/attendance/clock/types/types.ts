import { ActionStateResult } from '@/lib/actionTypes';

export type AttendanceStatus =
  | { type: 'not_started' }
  | { type: 'clocked_in'; startTime: number }
  | { type: 'clocked_out' }
  | { type: 'submitted' }
  | { type: 'approved' }
  | { type: 'system_admin' };

export type ClockInResult = ActionStateResult & { startTime?: number };
export type ClockOutResult = ActionStateResult & { endTime?: number };
