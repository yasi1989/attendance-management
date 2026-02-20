import { Attendance, Holiday, MonthlyAttendanceApproval } from '@/lib/actionTypes';

export type FetchMonthlyAttendanceDataResponse = {
  attendances: Attendance[];
  monthlyAttendanceApproval: MonthlyAttendanceApproval | null;
  holidays: Holiday[];
};
