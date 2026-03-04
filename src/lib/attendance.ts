import { LeaveType } from '@/types/attendance';
import { LEAVES_LIST, WORK_RULES } from '../consts/attendance';

export const isLeaveType = (attendanceType?: string): attendanceType is LeaveType => {
  if (!attendanceType) return false;
  return LEAVES_LIST.includes(attendanceType as LeaveType);
};

export const minutesToHours = (minutes: number): string => {
  return (minutes / 60).toFixed(2);
};

export const calcWorkHours = (
  startTime: number | null,
  endTime: number | null,
  breakTime: number | null,
): number | undefined => {
  if (startTime == null || endTime == null) return undefined;
  const workMinutes = endTime - startTime - (breakTime ?? WORK_RULES.DEFAULT_BREAK_MINUTES);
  if (workMinutes <= 0) return undefined;
  return Math.round((workMinutes / 60) * 10) / 10;
};

export const calcOvertimeHours = (
  startTime: number | null,
  endTime: number | null,
  breakTime: number | null,
): number | undefined => {
  if (startTime == null || endTime == null) return undefined;

  const workMinutes = endTime - startTime - (breakTime ?? WORK_RULES.DEFAULT_BREAK_MINUTES);
  if (workMinutes <= WORK_RULES.REGULAR_WORK_MINUTES) return 0;

  const overtimeMinutes = workMinutes - WORK_RULES.REGULAR_WORK_MINUTES;
  return Math.round((overtimeMinutes / 60) * 10) / 10;
};
