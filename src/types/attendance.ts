import { ATTENDANCES, HALF_DAYS, LEAVES } from '@/consts/attendance';
import { Attendance, Holiday, MonthlyAttendanceApproval } from '@/lib/actionTypes';
import { StatusType } from '@/types/statusType';

export type MonthlyAttendance = {
  attendanceData: Attendance[];
  canSubmit: boolean;
  monthlyStatus: StatusType;
};

export type AttendanceSummary = {
  totalWorkDays: number;
  totalWorkHours: number;
  totalOvertimeHours: number;
  approvedDays: number;
  submittedDays: number;
};

export type AttendanceDataResponse = {
  monthlyAttendance: MonthlyAttendance;
  holidays: Holiday[];
};

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
  categoryBreakdown: unknown;
  issues: string[] | null;
  canSubmit: boolean;
};

export type WorkTimeResult = { workMinutes: number; error: null } | { workMinutes: 0; error: string };
