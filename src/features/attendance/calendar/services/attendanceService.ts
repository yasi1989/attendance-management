import { timeStringToTimestamp } from '@/lib/date';
import { AttendanceData, MonthlySubmissionStatus, AttendanceDataResponse } from '../types/attendance';
import { fetchHolidays } from '@/features/admin/holidays/services/fetchHolidays';

export const FIXED_ATTENDANCE_DATA: Record<string, AttendanceData[]> = {
  '2025-6': [
    { 
      date: new Date('2025-06-02'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-02')),
      check_out: timeStringToTimestamp('22:00', new Date('2025-06-02')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-02')),
      comment: '残業が多い日でした',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 5 
    },
    { 
      date: new Date('2025-06-03'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-03')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-03')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-03')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-06-04'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-04')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-04')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-04')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-05'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-05')),
      check_out: timeStringToTimestamp('20:00', new Date('2025-06-05')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-05')),
      comment: 'プロジェクト対応',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 2 
    },
    { 
      date: new Date('2025-06-06'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-06')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-06')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-06')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-09'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-09')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-06-09')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-09')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-06-10'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('10:00', new Date('2025-06-10')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-10')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-10')),
      comment: '遅刻しました',
      status: 'Approved', 
      workHours: 7, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-11'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-11')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-11')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-11')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-12'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-12')),
      check_out: timeStringToTimestamp('21:00', new Date('2025-06-12')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-12')),
      comment: '会議が長引きました',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 3 
    },
    { 
      date: new Date('2025-06-13'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-13')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-13')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-13')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-16'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-16')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-16')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-16')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-17'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-17')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-06-17')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-17')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-06-18'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-18')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-18')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-18')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-19'), 
      attendanceType: 'Paid',
      isHalfDay: false,
      comment: '有給休暇取得',
      status: 'Approved', 
      workHours: 0, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-20'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-20')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-20')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-20')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-23'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-23')),
      check_out: timeStringToTimestamp('20:00', new Date('2025-06-23')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-23')),
      comment: 'プレゼン準備',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 2 
    },
    { 
      date: new Date('2025-06-24'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-24')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-24')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-24')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-25'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-25')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-06-25')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-25')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-06-26'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-26')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-26')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-26')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-27'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-27')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-06-27')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-27')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-06-30'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-06-30')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-06-30')),
      rest: timeStringToTimestamp('01:00', new Date('2025-06-30')),
      comment: '月末処理',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 1 
    },
  ],

  '2025-7': [
    { 
      date: new Date('2025-07-01'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-01')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-01')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-01')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-02'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-02')),
      check_out: timeStringToTimestamp('20:00', new Date('2025-07-02')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-02')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 2 
    },
    { 
      date: new Date('2025-07-03'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-03')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-03')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-03')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-04'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-04')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-07-04')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-04')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-07-07'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-07')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-07')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-07')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-08'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-08')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-08')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-08')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-09'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-09')),
      check_out: timeStringToTimestamp('21:00', new Date('2025-07-09')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-09')),
      comment: '緊急対応',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 3 
    },
    { 
      date: new Date('2025-07-10'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-10')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-10')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-10')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-11'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-11')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-07-11')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-11')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-07-14'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-14')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-14')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-14')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-15'), 
      attendanceType: 'Paid',
      isHalfDay: true,
      halfDayType: 'Am',
      check_in: timeStringToTimestamp('13:00', new Date('2025-07-15')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-15')),
      rest: timeStringToTimestamp('00:00', new Date('2025-07-15')),
      comment: '通院',
      status: 'Approved', 
      workHours: 5, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-16'), 
      attendanceType: 'Paid',
      isHalfDay: false,
      comment: '夏季休暇',
      status: 'Approved', 
      workHours: 0, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-17'), 
      attendanceType: 'Paid',
      isHalfDay: false,
      comment: '夏季休暇',
      status: 'Approved', 
      workHours: 0, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-18'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-18')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-18')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-18')),
      comment: '',
      status: 'Approved', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-21'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-21')),
      check_out: timeStringToTimestamp('20:00', new Date('2025-07-21')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-21')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 2 
    },
    { 
      date: new Date('2025-07-22'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-22')),
      check_out: timeStringToTimestamp('20:00', new Date('2025-07-22')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-22')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 2 
    },
    { 
      date: new Date('2025-07-23'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-23')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-23')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-23')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-24'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-24')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-07-24')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-24')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-07-25'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-25')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-25')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-25')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-28'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-28')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-28')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-28')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-29'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-29')),
      check_out: timeStringToTimestamp('20:00', new Date('2025-07-29')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-29')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 2 
    },
    { 
      date: new Date('2025-07-30'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-30')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-07-30')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-30')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-07-31'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-07-31')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-07-31')),
      rest: timeStringToTimestamp('01:00', new Date('2025-07-31')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 1 
    },
  ],

  '2025-8': [
    { 
      date: new Date('2025-08-01'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-01')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-01')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-01')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-04'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-04')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-08-04')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-04')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-08-05'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-05')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-05')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-05')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-06'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-06')),
      check_out: timeStringToTimestamp('20:00', new Date('2025-08-06')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-06')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 2 
    },
    { 
      date: new Date('2025-08-07'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-07')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-07')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-07')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-08'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-08')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-08')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-08')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-11'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('10:00', new Date('2025-08-11')),
      check_out: timeStringToTimestamp('16:00', new Date('2025-08-11')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-11')),
      comment: '体調不良で早退',
      status: 'Rejected', 
      workHours: 5, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-12'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:30', new Date('2025-08-12')),
      check_out: timeStringToTimestamp('17:30', new Date('2025-08-12')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-12')),
      comment: '遅刻',
      status: 'Rejected', 
      workHours: 6, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-08-13'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-13')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-13')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-13')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-14'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-14')),
      check_out: timeStringToTimestamp('21:00', new Date('2025-08-14')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-14')),
      comment: 'システム障害対応',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 3 
    },
    { 
      date: new Date('2025-08-15'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-15')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-15')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-15')),
      comment: '',
      status: 'Pending', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-18'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-18')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-08-18')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-18')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-08-19'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-19')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-19')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-19')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-20'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-20')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-20')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-20')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-21'), 
      attendanceType: 'Special',
      isHalfDay: false,
      comment: '特別休暇',
      status: 'Draft', 
      workHours: 0, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-22'), 
      attendanceType: 'Absence',
      isHalfDay: false,
      comment: '欠勤',
      status: 'Draft', 
      workHours: 0, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-25'), 
      attendanceType: 'Paid',
      isHalfDay: true,
      halfDayType: 'Am',
      check_in: timeStringToTimestamp('13:00', new Date('2025-08-25')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-25')),
      rest: timeStringToTimestamp('00:00', new Date('2025-08-25')),
      comment: '午前半休',
      status: 'Draft', 
      workHours: 4, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-26'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-26')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-26')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-26')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-27'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-27')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-08-27')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-27')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-08-28'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-28')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-28')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-28')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-08-29'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-08-29')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-08-29')),
      rest: timeStringToTimestamp('01:00', new Date('2025-08-29')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
  ],

  '2025-9': [
    { 
      date: new Date('2025-09-01'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-01')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-01')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-01')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-02'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-02')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-09-02')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-02')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-09-03'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-03')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-03')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-03')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-04'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-04')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-04')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-04')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-05'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-05')),
      check_out: timeStringToTimestamp('20:00', new Date('2025-09-05')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-05')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 2 
    },
    { 
      date: new Date('2025-09-08'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-08')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-08')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-08')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-09'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-09')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-09-09')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-09')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-09-10'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-10')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-10')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-10')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-11'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-11')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-11')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-11')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-12'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-12')),
      check_out: timeStringToTimestamp('21:00', new Date('2025-09-12')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-12')),
      comment: '月次処理対応',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 3 
    },
    { 
      date: new Date('2025-09-16'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-16')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-16')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-16')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-17'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-17')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-09-17')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-17')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-09-18'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-18')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-18')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-18')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-19'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-19')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-19')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-19')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-22'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-22')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-22')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-22')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-24'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-24')),
      check_out: timeStringToTimestamp('20:00', new Date('2025-09-24')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-24')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 2 
    },
    { 
      date: new Date('2025-09-25'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-25')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-25')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-25')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-26'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-26')),
      check_out: timeStringToTimestamp('19:00', new Date('2025-09-26')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-26')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 1 
    },
    { 
      date: new Date('2025-09-29'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-29')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-29')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-29')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
    { 
      date: new Date('2025-09-30'), 
      attendanceType: 'Work',
      isHalfDay: false,
      check_in: timeStringToTimestamp('09:00', new Date('2025-09-30')),
      check_out: timeStringToTimestamp('18:00', new Date('2025-09-30')),
      rest: timeStringToTimestamp('01:00', new Date('2025-09-30')),
      comment: '',
      status: 'Draft', 
      workHours: 8, 
      overtimeHours: 0 
    },
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
