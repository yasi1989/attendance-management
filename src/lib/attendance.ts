import { LEAVES_LIST } from '../consts/attendance';
import { LeaveType } from '../features/attendance/calendar/types/attendance';

export const isLeaveType = (attendanceType?: string): attendanceType is LeaveType => {
  if (!attendanceType) return false;
  return LEAVES_LIST.includes(attendanceType as LeaveType);
};
