import { LEAVE_TYPES, HALF_DAY_TYPES } from "../const/attendanceConst";

export type LeaveTypeValue = typeof LEAVE_TYPES[number]['value'];
export type HalfDayTypeValue = typeof HALF_DAY_TYPES[number]['value'];