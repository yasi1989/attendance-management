'use server';

import { and, between, eq, inArray } from 'drizzle-orm';
import { STATUS_WITH_ALL } from '@/consts/status';
import { getAllHolidays } from '@/features/admin/holidays/lib/holidays';
import { requireExpenseAccess } from '@/features/expense/lib/roleGuard';
import { Department } from '@/lib/actionTypes';
import { calculateSummary } from '@/lib/calculateSummary';
import { getYearMonthRange } from '@/lib/date';
import { db } from '@/lib/db/drizzle';
import {
  attendanceApprovalSteps,
  attendances,
  departments,
  expenseGroupApprovalSteps,
  expenses,
  groupExpenseApprovals,
  monthlyAttendanceApprovals,
  users,
} from '@/lib/db/schema';
import { Result } from '@/lib/result';
import { StatusTypeWithAll } from '@/types/statusType';
import { requireApprovalManagement } from '../lib/roleGuard';
import { AttendanceApprovalRow, ExpenseApprovalRow } from '../type/approvalType';

export const fetchAttendanceApprovals = async (
  year: number,
  month: number,
  status: StatusTypeWithAll,
): Promise<Result<AttendanceApprovalRow[]>> => {
  try {
    const authResult = await requireApprovalManagement();
    if (!authResult.success) return { success: false, error: authResult.error };

    const user = authResult.data;
    const { startDate, endDate } = getYearMonthRange(year, month);

    const conditions = and(
      between(monthlyAttendanceApprovals.targetMonth, startDate, endDate),
      eq(attendanceApprovalSteps.approverId, user.id),
      status !== STATUS_WITH_ALL.ALL.value ? eq(monthlyAttendanceApprovals.statusCode, status) : undefined,
    );

    const rows = await db
      .select({
        monthlyAttendanceApproval: monthlyAttendanceApprovals,
        attendanceApprovalStep: attendanceApprovalSteps,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
          companyId: users.companyId,
          departmentId: users.departmentId,
          roleId: users.roleId,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
      })
      .from(monthlyAttendanceApprovals)
      .innerJoin(
        attendanceApprovalSteps,
        eq(attendanceApprovalSteps.monthlyAttendanceApprovalId, monthlyAttendanceApprovals.id),
      )
      .innerJoin(users, eq(users.id, monthlyAttendanceApprovals.userId))
      .where(conditions);

    if (rows.length === 0) return { success: true, data: [] };

    const userIds = [...new Set(rows.map((r) => r.monthlyAttendanceApproval.userId))];
    const [allAttendances, holidays] = await Promise.all([
      db.query.attendances.findMany({
        where: and(inArray(attendances.userId, userIds), between(attendances.workDate, startDate, endDate)),
      }),
      getAllHolidays({ year, month, companyId: user.companyId }),
    ]);

    const attendanceMap = new Map<string, typeof allAttendances>(
      userIds.map((id) => [id, allAttendances.filter((a) => a.userId === id)]),
    );

    const data = rows.map((row) => {
      const userAttendances = attendanceMap.get(row.monthlyAttendanceApproval.userId) ?? [];
      const summary = calculateSummary(
        userAttendances,
        holidays,
        startDate,
        endDate,
        row.monthlyAttendanceApproval.statusCode,
      );
      return { ...row, summary };
    });

    return { success: true, data };
  } catch (error) {
    console.error('勤怠承認データ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('データ取得に失敗しました。') };
  }
};

export const fetchExpenseApprovals = async (
  year: number,
  month: number,
  status: StatusTypeWithAll,
): Promise<Result<ExpenseApprovalRow[]>> => {
  try {
    const authResult = await requireApprovalManagement();
    if (!authResult.success) return { success: false, error: authResult.error };

    const user = authResult.data;
    const { startDate, endDate } = getYearMonthRange(year, month);

    const conditions = and(
      between(groupExpenseApprovals.submittedAt, startDate, endDate),
      eq(expenseGroupApprovalSteps.approverId, user.id),
      status !== STATUS_WITH_ALL.ALL.value ? eq(groupExpenseApprovals.statusCode, status) : undefined,
    );

    const rows = await db
      .select({
        groupExpenseApproval: groupExpenseApprovals,
        expenseGroupApprovalStep: expenseGroupApprovalSteps,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
          companyId: users.companyId,
          departmentId: users.departmentId,
          roleId: users.roleId,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
      })
      .from(groupExpenseApprovals)
      .innerJoin(
        expenseGroupApprovalSteps,
        eq(expenseGroupApprovalSteps.groupExpenseApprovalId, groupExpenseApprovals.id),
      )
      .innerJoin(users, eq(users.id, groupExpenseApprovals.userId))
      .where(conditions);

    if (rows.length === 0) return { success: true, data: [] };

    const groupIds = [...new Set(rows.map((r) => r.groupExpenseApproval.id))];

    const allExpenses = await db.query.expenses.findMany({
      where: inArray(expenses.groupExpenseApprovalId, groupIds),
    });

    const expenseMap = new Map<string, typeof allExpenses>(
      groupIds.map((id) => [id, allExpenses.filter((e) => e.groupExpenseApprovalId === id)]),
    );

    const data = rows.map((row) => {
      const groupExpenses = expenseMap.get(row.groupExpenseApproval.id) ?? [];
      const totalAmount = groupExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
      const itemCount = groupExpenses.length;
      const categoryBreakdown = groupExpenses.reduce(
        (acc, e) => {
          const key = e.expenseType;
          if (!acc[key]) acc[key] = { name: key, amount: 0, count: 0 };
          acc[key].amount += Number(e.amount);
          acc[key].count += 1;
          return acc;
        },
        {} as Record<string, { name: string; amount: number; count: number }>,
      );

      return { ...row, totalAmount, itemCount, categoryBreakdown };
    });

    return { success: true, data };
  } catch (error) {
    console.error('経費承認データ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('データ取得に失敗しました。') };
  }
};

export const fetchApprovalDepartments = async (): Promise<Result<Department[]>> => {
  try {
    const authResult = await requireExpenseAccess();
    if (!authResult.success) return { success: false, error: authResult.error };

    const user = authResult.data;

    const result = await db.query.departments.findMany({
      where: eq(departments.companyId, user.companyId),
      orderBy: (t, { asc }) => [asc(t.departmentName)],
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('部署データ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('データ取得に失敗しました。') };
  }
};
