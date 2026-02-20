import { Holiday, MonthlyAttendanceApproval, MonthlyAttendanceSummary } from '@/lib/actionTypes';
import { StatusType } from '@/types/statusType';
import { ATTENDANCES, HALF_DAYS, LEAVES } from '../../../../consts/attendance';

export type AttendanceData = {
  date: Date;
  status: StatusType;
  workHours?: number;
  overtimeHours?: number;
  attendanceType: AttendanceType;
  isHalfDay?: boolean;
  halfDayType?: HalfDayType;
  check_in?: number;
  check_out?: number;
  rest?: number;
  comment?: string;
};

export type MonthlyAttendance = {
  attendanceData: AttendanceData[];
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

export type SummaryResult =
  | (MonthlyAttendanceSummary & { source: 'database' })
  | (MonthlyAttendanceSummary & { source: 'calculated' });

export type AttendanceType = (typeof ATTENDANCES)[keyof typeof ATTENDANCES]['value'];
export type LeaveType = (typeof LEAVES)[keyof typeof LEAVES]['value'];
export type HalfDayType = (typeof HALF_DAYS)[keyof typeof HALF_DAYS]['value'];
