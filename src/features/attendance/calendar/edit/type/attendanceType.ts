import { ATTENDANCE_TYPES, HALF_DAY_TYPES } from "../const/attendanceConst";

export type LeaveTypeValue = typeof ATTENDANCE_TYPES[number]['value'];
export type HalfDayTypeValue = typeof HALF_DAY_TYPES[number]['value'];