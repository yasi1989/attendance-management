import { HolidayType } from '@/features/admin/holidays/type/holidayType';
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
  holidays: HolidayType[];
};

export type AttendanceType = (typeof ATTENDANCES)[keyof typeof ATTENDANCES]['value'];
export type LeaveType = (typeof LEAVES)[keyof typeof LEAVES]['value'];
export type HalfDayType = (typeof HALF_DAYS)[keyof typeof HALF_DAYS]['value'];
