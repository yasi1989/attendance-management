import { LeaveType } from '@/types/attendance';
import { LEAVES_LIST, WORK_RULES } from '../consts/attendance';

export const isLeaveType = (attendanceType?: string): attendanceType is LeaveType => {
  if (!attendanceType) return false;
  return LEAVES_LIST.includes(attendanceType as LeaveType);
};

export const formatMinutesToHours = (minutes: number): string => (minutes / 60).toFixed(2);

export const calcWorkMinutes = (
  startTime: number | null,
  endTime: number | null,
  breakTime: number | null,
): number | undefined => {
  if (startTime == null || endTime == null) return undefined;
  const minutes = endTime - startTime - (breakTime ?? WORK_RULES.DEFAULT_BREAK_MINUTES);
  return minutes > 0 ? minutes : undefined;
};

export const minutesToHours = (minutes: number): number => Math.round((minutes / 60) * 10) / 10;

export const calcWorkHours = (
  startTime: number | null,
  endTime: number | null,
  breakTime: number | null,
): number | undefined => {
  const minutes = calcWorkMinutes(startTime, endTime, breakTime);
  if (minutes == null) return undefined;
  return minutesToHours(minutes);
};

export const calcOvertimeHours = (
  startTime: number | null,
  endTime: number | null,
  breakTime: number | null,
): number | undefined => {
  const minutes = calcWorkMinutes(startTime, endTime, breakTime);
  if (minutes == null) return undefined;
  if (minutes <= WORK_RULES.REGULAR_WORK_MINUTES) return 0;
  return minutesToHours(minutes - WORK_RULES.REGULAR_WORK_MINUTES);
};
