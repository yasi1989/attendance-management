import { HolidayType } from '@/features/admin/holidays/type/holidayType';

export type AttendanceData = {
  date: Date;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Draft';
  workHours?: number;
  overtimeHours?: number;
  attendanceType?: 'Paid' | 'Absence' | 'Special' | 'Work';
  isHalfDay?: boolean;
  halfDayType?: 'Am' | 'Pm';
  check_in?: number;
  check_out?: number;
  rest?: number;
  comment?: string;
}

export type MonthlySubmissionStatus = 'None' | 'Draft' | 'Submitted' | 'Approved' | 'Rejected';

export type AttendanceSummary = {
  totalWorkDays: number;
  totalWorkHours: number;
  totalOvertimeHours: number;
  approvedDays: number;
  pendingDays: number;
}

export type AttendanceDataResponse = {
  attendances: AttendanceData[];
  monthlyStatus: MonthlySubmissionStatus;
  holidays: HolidayType[];
}
