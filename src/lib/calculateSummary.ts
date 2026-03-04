import { ATTENDANCES, WORK_RULES } from '@/consts/attendance';
import { STATUS } from '@/consts/status';
import { Attendance, Holiday } from '@/lib/actionTypes';
import { calculateWorkDays } from '@/lib/date';
import { formatDateForDisplay } from '@/lib/dateClient';
import { AttendanceAggregation, MonthlyAttendanceSummary, WorkTimeResult } from '@/types/attendance';
import { StatusType } from '@/types/statusType';
import { minutesToHours } from './attendance';

export function evaluateCanSubmit(
  status: StatusType | null,
  workDayDates: string[],
  attendances: Attendance[],
): boolean {
  if (status === STATUS.SUBMITTED.value || status === STATUS.APPROVED.value) {
    return false;
  }

  const attendanceMap = new Map<string, Attendance>(attendances.map((a) => [formatDateForDisplay(a.workDate), a]));
  return findUnfilledWorkDays(workDayDates, attendanceMap).length === 0;
}

export function calculateSummary(
  attendances: Attendance[],
  holidays: Holiday[],
  startDate: Date,
  endDate: Date,
  currentStatus: StatusType | null = null,
): MonthlyAttendanceSummary {
  const holidayDatesSet = createHolidaySet(holidays);
  const workDays = calculateWorkDays(startDate, endDate, holidayDatesSet);
  const aggregation = aggregateAttendances(attendances);

  return {
    totalWorkDays: workDays.length,
    actualWorkDays: aggregation.actualWorkDays,
    totalWorkHours: minutesToHours(aggregation.totalMinutes),
    regularHours: minutesToHours(aggregation.regularMinutes),
    overtimeHours: minutesToHours(aggregation.overtimeMinutes),
    categoryBreakdown: aggregation.categoryBreakdown,
    issues: aggregation.issues.length > 0 ? aggregation.issues : null,
    canSubmit: evaluateCanSubmit(currentStatus, workDays, attendances),
  };
}

function findUnfilledWorkDays(workDayDates: string[], attendanceMap: Map<string, Attendance>): string[] {
  return workDayDates.filter((dateStr) => isUnfilledWorkDay(dateStr, attendanceMap));
}

function isUnfilledWorkDay(dateStr: string, attendanceMap: Map<string, Attendance>): boolean {
  const record = attendanceMap.get(dateStr);

  if (!record) return true;
  if (record.attendanceType !== ATTENDANCES.WORK.value) return false;

  return record.startTime == null || record.endTime == null;
}

function createHolidaySet(holidays: Holiday[]): Set<string> {
  return new Set(holidays.map((h) => formatDateForDisplay(h.holidayDate)));
}

function aggregateAttendances(attendances: Attendance[]): AttendanceAggregation {
  const workAttendances = attendances.filter((a) => a.attendanceType === ATTENDANCES.WORK.value);
  const workTimeResults = workAttendances.map((a) => ({ attendance: a, result: calculateWorkTime(a) }));

  const validResults = workTimeResults.filter((r) => !r.result.error) as {
    attendance: Attendance;
    result: Extract<WorkTimeResult, { error: null }>;
  }[];

  const regularOvertimePairs = validResults.map(({ result }) => splitRegularAndOvertime(result.workMinutes));

  return {
    actualWorkDays: validResults.length,
    totalMinutes: validResults.reduce((sum, { result }) => sum + result.workMinutes, 0),
    regularMinutes: regularOvertimePairs.reduce((sum, { regular }) => sum + regular, 0),
    overtimeMinutes: regularOvertimePairs.reduce((sum, { overtime }) => sum + overtime, 0),
    categoryBreakdown: buildCategoryBreakdown(attendances),
    issues: workTimeResults.flatMap(({ result }) => (result.error ? [result.error] : [])),
  };
}

function buildCategoryBreakdown(attendances: Attendance[]): Record<string, number> {
  return Object.fromEntries(
    [...new Set(attendances.map((a) => a.attendanceType))].map((type) => [
      type,
      attendances.filter((a) => a.attendanceType === type).length,
    ]),
  );
}

function calculateWorkTime(attendance: Attendance): WorkTimeResult {
  const dateStr = formatDateForDisplay(attendance.workDate);

  if (attendance.startTime == null || attendance.endTime == null) {
    return { workMinutes: 0, error: `${dateStr}: 勤務時間が未入力です` };
  }

  const workMinutes =
    attendance.endTime - attendance.startTime - (attendance.breakTime ?? WORK_RULES.DEFAULT_BREAK_MINUTES);

  if (workMinutes < 0) {
    return { workMinutes: 0, error: `${dateStr}: 勤務時間が不正です` };
  }

  return { workMinutes, error: null };
}

function splitRegularAndOvertime(workMinutes: number): { regular: number; overtime: number } {
  if (workMinutes <= WORK_RULES.REGULAR_WORK_MINUTES) {
    return { regular: workMinutes, overtime: 0 };
  }
  return {
    regular: WORK_RULES.REGULAR_WORK_MINUTES,
    overtime: workMinutes - WORK_RULES.REGULAR_WORK_MINUTES,
  };
}
