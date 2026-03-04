import { Attendance, Holiday, MonthlyAttendanceApproval } from '@/lib/actionTypes';
import { MonthlyAttendanceSummary } from '@/types/attendance';

export type FetchMonthlyAttendanceDataResponse = {
  attendances: Attendance[];
  monthlyAttendanceApproval: MonthlyAttendanceApproval | null;
  monthlyAttendanceSummary: MonthlyAttendanceSummary;
  holidays: Holiday[];
};
