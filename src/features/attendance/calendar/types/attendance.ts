import { HolidayType } from '@/features/admin/holidays/type/holidayType';

export type AttendanceData = {
  date: Date;
  status: MonthlySubmissionStatus;
  workHours?: number;
  overtimeHours?: number;
  attendanceType?: 'Paid' | 'Absence' | 'Special' | 'Work';
  isHalfDay?: boolean;
  halfDayType?: 'Am' | 'Pm';
  check_in?: number;
  check_out?: number;
  rest?: number;
  comment?: string;
};

export type MonthlyAttendance = {
  attendanceData: AttendanceData[];
  canSubmit: boolean;
  monthlyStatus: MonthlySubmissionStatus;
};

export type MonthlySubmissionStatus = 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'None';

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
