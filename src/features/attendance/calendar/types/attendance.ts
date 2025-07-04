import { HolidayType } from '@/features/admin/holidays/type/holidayType';

export interface AttendanceData {
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Draft';
  workHours?: number;
  overtimeHours?: number;
  isHoliday?: boolean;
  leaveType?: 'Paid' | 'Sick' | 'Personal';
}

export type MonthlySubmissionStatus = 'None' | 'Draft' | 'Submitted' | 'Approved' | 'Rejected';

export interface AttendanceSummary {
  totalWorkDays: number;
  totalWorkHours: number;
  totalOvertimeHours: number;
  approvedDays: number;
  pendingDays: number;
}

export interface AttendanceDataResponse {
  attendances: AttendanceData[];
  monthlyStatus: MonthlySubmissionStatus;
  holidays: HolidayType[];
}
