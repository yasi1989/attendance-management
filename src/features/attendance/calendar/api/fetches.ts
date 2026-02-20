// features/attendances/actions/fetchMonthlyAttendance.ts
import { and, between, eq } from 'drizzle-orm';
import { getAllHolidays } from '@/features/admin/holidays/lib/holidays';
import { requireAttendanceAccess } from '@/features/auth/lib/authRoleUtils';
import { getYearMonthRange } from '@/lib/date';
import { db } from '@/lib/db/drizzle';
import { calculateSummaryOnTheFly } from '../lib/calculateSummary';
import { FetchMonthlyAttendanceDataResponse } from '../types/fetchResultResponse';

export const fetchMonthlyAttendance = async (
  year: number,
  month: number,
): Promise<FetchMonthlyAttendanceDataResponse> => {
  try {
    const { user } = await requireAttendanceAccess();
    const { startDate, endDate } = getYearMonthRange(year, month);

    const [attendances, monthlyAttendanceApproval, holidays] = await Promise.all([
      db.query.attendances.findMany({
        where: (attendances) => and(eq(attendances.userId, user.id), between(attendances.workDate, startDate, endDate)),
        orderBy: (attendances, { asc }) => [asc(attendances.workDate)],
      }),
      db.query.monthlyAttendanceApprovals.findFirst({
        where: (approvals) => and(eq(approvals.userId, user.id), eq(approvals.targetMonth, startDate)),
        with: {
          summary: true,
        },
      }),
      getAllHolidays({ year, month, companyId: user.companyId ?? null }),
    ]);

    const summary = determineSummary(monthlyAttendanceApproval, attendances, holidays, startDate, endDate);

    return {
      attendances,
      monthlyAttendanceApproval: monthlyAttendanceApproval ?? null,
      summary,
      holidays,
    };
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    throw error;
  }
};

function determineSummary(
  approval: ApprovalWithSummary | null,
  attendances: Attendance[],
  holidays: Holiday[],
  startDate: Date,
  endDate: Date,
): SummaryResult {
  const shouldUseDatabaseSummary =
    approval?.summary !== null &&
    approval?.summary !== undefined &&
    ['Submitted', 'Approved'].includes(approval.statusCode);

  if (shouldUseDatabaseSummary && approval.summary) {
    return {
      ...approval.summary,
      source: 'database' as const,
    };
  }

  return calculateSummaryOnTheFly(attendances, holidays, startDate, endDate);
}
