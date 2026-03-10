import { ATTENDANCES, HALF_DAYS, LEAVES } from '@/consts/attendance';

export type LeaveType = (typeof LEAVES)[keyof typeof LEAVES]['value'];
export type AttendanceType = (typeof ATTENDANCES)[keyof typeof ATTENDANCES]['value'];
export type HalfDayType = (typeof HALF_DAYS)[keyof typeof HALF_DAYS]['value'];
