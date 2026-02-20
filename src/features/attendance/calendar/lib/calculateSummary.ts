import { Attendance, Holiday, MonthlyAttendanceSummary } from '@/lib/actionTypes';
import { calculateWorkDays } from '@/lib/date';
import { formatDateForDisplay } from '@/lib/dateClient';

const REGULAR_WORK_MINUTES = 8 * 60;

export function calculateSummaryOnTheFly(
  attendances: Attendance[],
  holidays: Holiday[],
  startDate: Date,
  endDate: Date,
): MonthlyAttendanceSummary & { source: 'calculated' } {
  return {
    ...calculateSummary(attendances, holidays, startDate, endDate),
    source: 'calculated',
  };
}

export function calculateSummary(
  attendances: Attendance[],
  holidays: Holiday[],
  startDate: Date,
  endDate: Date,
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
    calculatedAt: new Date(),
    id: '',
    createdAt: new Date(),
    updatedAt: null,
    monthlyAttendanceApprovalId: '',
  };
}

function createHolidaySet(holidays: Holiday[]): Set<string> {
  return new Set(holidays.map((h) => formatDateForDisplay(h.holidayDate)));
}

type AttendanceAggregation = {
  actualWorkDays: number;
  totalMinutes: number;
  regularMinutes: number;
  overtimeMinutes: number;
  categoryBreakdown: Record<string, number>;
  issues: string[];
};

function aggregateAttendances(attendances: Attendance[]): AttendanceAggregation {
  let actualWorkDays = 0;
  let totalMinutes = 0;
  let regularMinutes = 0;
  let overtimeMinutes = 0;
  const categoryBreakdown: Record<string, number> = {};
  const issues: string[] = [];

  for (const attendance of attendances) {
    incrementCategoryCount(categoryBreakdown, attendance.attendanceType);

    if (attendance.attendanceType === 'Work') {
      actualWorkDays++;

      const workTimeResult = calculateWorkTime(attendance);

      if (workTimeResult.error) {
        issues.push(workTimeResult.error);
        continue;
      }

      totalMinutes += workTimeResult.workMinutes;

      const { regular, overtime } = splitRegularAndOvertime(workTimeResult.workMinutes);
      regularMinutes += regular;
      overtimeMinutes += overtime;
    }
  }

  return {
    actualWorkDays,
    totalMinutes,
    regularMinutes,
    overtimeMinutes,
    categoryBreakdown,
    issues,
  };
}

function incrementCategoryCount(categoryBreakdown: Record<string, number>, type: string): void {
  categoryBreakdown[type] = (categoryBreakdown[type] || 0) + 1;
}

type WorkTimeResult = { workMinutes: number; error: null } | { workMinutes: 0; error: string };

function calculateWorkTime(attendance: Attendance): WorkTimeResult {
  const dateStr = formatDateForDisplay(attendance.workDate);

  if (attendance.startTime == null || attendance.endTime == null) {
    return {
      workMinutes: 0,
      error: `${dateStr}: 勤務時間が未入力です`,
    };
  }

  const workMinutes = attendance.endTime - attendance.startTime - (attendance.breakTime || 0);

  if (workMinutes < 0) {
    return {
      workMinutes: 0,
      error: `${dateStr}: 勤務時間が不正です`,
    };
  }

  return { workMinutes, error: null };
}

function splitRegularAndOvertime(workMinutes: number): {
  regular: number;
  overtime: number;
} {
  if (workMinutes <= REGULAR_WORK_MINUTES) {
    return { regular: workMinutes, overtime: 0 };
  }
  return {
    regular: REGULAR_WORK_MINUTES,
    overtime: workMinutes - REGULAR_WORK_MINUTES,
  };
}

function minutesToHours(minutes: number): string {
  return (minutes / 60).toFixed(2);
}
