import { ATTENDANCES, HALF_DAYS, LEAVES } from '@/consts/attendance';
import { MonthlyAttendanceApproval } from '@/lib/actionTypes';

export type ApprovalWithSummary = MonthlyAttendanceApproval & {
  summary: MonthlyAttendanceSummary | null;
};

export type AttendanceType = (typeof ATTENDANCES)[keyof typeof ATTENDANCES]['value'];
export type LeaveType = (typeof LEAVES)[keyof typeof LEAVES]['value'];
export type HalfDayType = (typeof HALF_DAYS)[keyof typeof HALF_DAYS]['value'];

export type AttendanceAggregation = {
  actualWorkDays: number;
  totalMinutes: number;
  regularMinutes: number;
  overtimeMinutes: number;
  categoryBreakdown: Record<string, number>;
  issues: string[];
};

export type MonthlyAttendanceSummary = {
  totalWorkDays: number;
  actualWorkDays: number;
  totalWorkHours: string;
  regularHours: string;
  overtimeHours: string;
  categoryBreakdown: Record<string, number>;
  issues: string[] | null;
  canSubmit: boolean;
};

export type WorkTimeResult = { workMinutes: number; error: null } | { workMinutes: 0; error: string };
