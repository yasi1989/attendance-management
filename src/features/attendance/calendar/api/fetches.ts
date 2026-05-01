'use server';
import { and, between, eq } from 'drizzle-orm';
import { getAllHolidays } from '@/features/admin/holidays/lib/holidays';
import { calculateSummary } from '@/lib/calculateSummary';
import { getYearMonthRange } from '@/lib/date';
import { db } from '@/lib/db/drizzle';
import { Result } from '@/lib/result';
import { requireAttendanceManagement } from '../lib/roleGuard';
import { FetchMonthlyAttendanceDataResponse } from '../types/fetchResultResponse';

export const fetchMonthlyAttendance = async (
  year: number,
  month: number,
): Promise<Result<FetchMonthlyAttendanceDataResponse>> => {
  const authResult = await requireAttendanceManagement();
  if (!authResult.success) return { success: false, error: authResult.error };

  const user = authResult.data;
  const { startDate, endDate } = getYearMonthRange(year, month);

  try {
    const [attendances, monthlyAttendanceApproval, holidays] = await Promise.all([
      db.query.attendances.findMany({
        where: (attendances) =>
          and(eq(attendances.userId, user.id), between(attendances.workDate, startDate, endDate)),
        orderBy: (attendances, { asc }) => [asc(attendances.workDate)],
      }),
      db.query.monthlyAttendanceApprovals.findFirst({
        where: (approvals) =>
          and(eq(approvals.userId, user.id), eq(approvals.targetMonth, startDate)),
      }),
      getAllHolidays({ year, month, companyId: user.companyId ?? null }),
    ]);

    const monthlyAttendanceSummary = calculateSummary(
      attendances,
      holidays,
      startDate,
      endDate,
      user.role,
      monthlyAttendanceApproval?.statusCode ?? null,
    );

    return {
      success: true,
      data: {
        attendances,
        monthlyAttendanceApproval: monthlyAttendanceApproval ?? null,
        monthlyAttendanceSummary,
        holidays,
      },
    };
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('データ取得に失敗しました。') };
  }
};