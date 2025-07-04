import { AttendanceData, MonthlySubmissionStatus, AttendanceDataResponse } from '../types/attendance';
import { fetchHolidays } from '@/features/admin/holidays/services/fetchHolidays';

const FIXED_ATTENDANCE_DATA: Record<string, AttendanceData[]> = {
  '2025-6': [
    { date: '2025-06-02', status: 'Approved', workHours: 8, overtimeHours: 5 },
    { date: '2025-06-03', status: 'Approved', workHours: 8, overtimeHours: 1 },
    { date: '2025-06-04', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-06-05', status: 'Approved', workHours: 8, overtimeHours: 2 },
    { date: '2025-06-06', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-06-09', status: 'Approved', workHours: 8, overtimeHours: 1 },
    { date: '2025-06-10', status: 'Approved', workHours: 7, overtimeHours: 0 },
    { date: '2025-06-11', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-06-12', status: 'Approved', workHours: 8, overtimeHours: 3 },
    { date: '2025-06-13', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-06-16', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-06-17', status: 'Approved', workHours: 8, overtimeHours: 1 },
    { date: '2025-06-18', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-06-19', status: 'Approved', workHours: 0, leaveType: 'Paid' },
    { date: '2025-06-20', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-06-23', status: 'Approved', workHours: 8, overtimeHours: 2 },
    { date: '2025-06-24', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-06-25', status: 'Approved', workHours: 8, overtimeHours: 1 },
    { date: '2025-06-26', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-06-27', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-06-30', status: 'Approved', workHours: 8, overtimeHours: 1 },
  ],

  '2025-7': [
    { date: '2025-07-01', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-07-02', status: 'Approved', workHours: 8, overtimeHours: 2 },
    { date: '2025-07-03', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-07-04', status: 'Approved', workHours: 8, overtimeHours: 1 },
    { date: '2025-07-07', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-07-08', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-07-09', status: 'Approved', workHours: 8, overtimeHours: 3 },
    { date: '2025-07-10', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-07-11', status: 'Approved', workHours: 8, overtimeHours: 1 },
    { date: '2025-07-14', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-07-15', status: 'Approved', workHours: 0, leaveType: 'Paid' },
    { date: '2025-07-16', status: 'Approved', workHours: 0, leaveType: 'Paid' },
    { date: '2025-07-17', status: 'Approved', workHours: 0, leaveType: 'Paid' },
    { date: '2025-07-18', status: 'Approved', workHours: 8, overtimeHours: 0 },
    { date: '2025-07-21', status: 'Pending', workHours: 8, overtimeHours: 2 },
    { date: '2025-07-22', status: 'Pending', workHours: 8, overtimeHours: 2 },
    { date: '2025-07-23', status: 'Pending', workHours: 8, overtimeHours: 0 },
    { date: '2025-07-24', status: 'Pending', workHours: 8, overtimeHours: 1 },
    { date: '2025-07-25', status: 'Pending', workHours: 8, overtimeHours: 0 },
    { date: '2025-07-28', status: 'Pending', workHours: 8, overtimeHours: 0 },
    { date: '2025-07-29', status: 'Pending', workHours: 8, overtimeHours: 2 },
    { date: '2025-07-30', status: 'Pending', workHours: 8, overtimeHours: 0 },
    { date: '2025-07-31', status: 'Pending', workHours: 8, overtimeHours: 1 },
  ],

  '2025-8': [
    { date: '2025-08-01', status: 'Pending', workHours: 8, overtimeHours: 0 },
    { date: '2025-08-04', status: 'Pending', workHours: 8, overtimeHours: 1 },
    { date: '2025-08-05', status: 'Pending', workHours: 8, overtimeHours: 0 },
    { date: '2025-08-06', status: 'Pending', workHours: 8, overtimeHours: 2 },
    { date: '2025-08-07', status: 'Pending', workHours: 8, overtimeHours: 0 },
    { date: '2025-08-08', status: 'Pending', workHours: 8, overtimeHours: 0 },
    { date: '2025-08-11', status: 'Rejected', workHours: 5, overtimeHours: 0 },
    { date: '2025-08-12', status: 'Rejected', workHours: 6, overtimeHours: 1 },
    { date: '2025-08-13', status: 'Pending', workHours: 8, overtimeHours: 0 },
    { date: '2025-08-14', status: 'Pending', workHours: 8, overtimeHours: 3 },
    { date: '2025-08-15', status: 'Pending', workHours: 8, overtimeHours: 0 },
    { date: '2025-08-18', status: 'Draft', workHours: 8, overtimeHours: 1 },
    { date: '2025-08-19', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-08-20', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-08-21', status: 'Draft', workHours: 0, leaveType: 'Special' },
    { date: '2025-08-22', status: 'Draft', workHours: 0, leaveType: 'Absence' },
    { date: '2025-08-25', status: 'Draft', workHours: 8, overtimeHours: 2 },
    { date: '2025-08-26', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-08-27', status: 'Draft', workHours: 8, overtimeHours: 1 },
    { date: '2025-08-28', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-08-29', status: 'Draft', workHours: 8, overtimeHours: 0 },
  ],

  '2025-9': [
    { date: '2025-09-01', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-02', status: 'Draft', workHours: 8, overtimeHours: 1 },
    { date: '2025-09-03', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-04', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-05', status: 'Draft', workHours: 8, overtimeHours: 2 },
    { date: '2025-09-08', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-09', status: 'Draft', workHours: 8, overtimeHours: 1 },
    { date: '2025-09-10', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-11', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-12', status: 'Draft', workHours: 8, overtimeHours: 3 },
    { date: '2025-09-16', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-17', status: 'Draft', workHours: 8, overtimeHours: 1 },
    { date: '2025-09-18', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-19', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-22', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-24', status: 'Draft', workHours: 8, overtimeHours: 2 },
    { date: '2025-09-25', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-26', status: 'Draft', workHours: 8, overtimeHours: 1 },
    { date: '2025-09-29', status: 'Draft', workHours: 8, overtimeHours: 0 },
    { date: '2025-09-30', status: 'Draft', workHours: 8, overtimeHours: 0 },
  ],
};

const FIXED_MONTHLY_SUBMISSIONS: Record<string, MonthlySubmissionStatus> = {
  '2025-6': 'Approved',
  '2025-7': 'Submitted',
  '2025-8': 'Rejected',
  '2025-9': 'Draft',
};

function getFixedAttendanceData(year: number, month: number): AttendanceData[] {
  const key = `${year}-${month}`;
  const baseData = FIXED_ATTENDANCE_DATA[key] || [];

  return baseData;
}

export async function getAttendanceData(year: number, month: number): Promise<AttendanceDataResponse> {
  try {
    // 実際のAPIを模倣した遅延
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 固定データの取得
    const holidays = fetchHolidays();
    const attendances = getFixedAttendanceData(year, month);

    // 月次申請状況の取得
    const monthlyStatusKey = `${year}-${month}`;
    const monthlyStatus = FIXED_MONTHLY_SUBMISSIONS[monthlyStatusKey] || 'none';

    return {
      attendances,
      monthlyStatus,
      holidays,
    };
  } catch (error) {
    console.error('勤怠データ取得エラー:', error);
    throw new Error('勤怠データの取得に失敗しました');
  }
}
