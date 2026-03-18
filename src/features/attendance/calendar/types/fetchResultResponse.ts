import { HolidayDisplay } from '@/features/admin/holidays/type/holidaysDisplayType';
import { Attendance, MonthlyAttendanceApproval } from '@/lib/actionTypes';
import { MonthlyAttendanceSummary } from '@/types/attendance';

export type FetchMonthlyAttendanceDataResponse = {
  attendances: Attendance[];
  monthlyAttendanceApproval: MonthlyAttendanceApproval | null;
  monthlyAttendanceSummary: MonthlyAttendanceSummary;
  holidays: HolidayDisplay[];
};
