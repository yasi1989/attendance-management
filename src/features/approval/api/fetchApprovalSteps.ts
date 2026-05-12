'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { attendanceApprovalSteps, expenseGroupApprovalSteps, users } from '@/lib/db/schema';
import { Result } from '@/lib/result';
import { ApprovalStepType } from '../type/approvalStepType';

export const fetchAttendanceApprovalSteps = async (
  monthlyAttendanceApprovalId: string,
): Promise<Result<ApprovalStepType[]>> => {
  try {
    const rows = await db
      .select({
        id: attendanceApprovalSteps.id,
        stepOrder: attendanceApprovalSteps.stepOrder,
        approverId: attendanceApprovalSteps.approverId,
        approverName: users.name,
        statusCode: attendanceApprovalSteps.statusCode,
        approvedAt: attendanceApprovalSteps.approvedAt,
        comment: attendanceApprovalSteps.comment,
      })
      .from(attendanceApprovalSteps)
      .innerJoin(users, eq(users.id, attendanceApprovalSteps.approverId))
      .where(eq(attendanceApprovalSteps.monthlyAttendanceApprovalId, monthlyAttendanceApprovalId))
      .orderBy(attendanceApprovalSteps.stepOrder);

    return { success: true, data: rows };
  } catch (error) {
    console.error('勤怠承認ステップ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('データ取得に失敗しました。') };
  }
};

export const fetchExpenseApprovalSteps = async (
  groupExpenseApprovalId: string,
): Promise<Result<ApprovalStepType[]>> => {
  try {
    const rows = await db
      .select({
        id: expenseGroupApprovalSteps.id,
        stepOrder: expenseGroupApprovalSteps.stepOrder,
        approverId: expenseGroupApprovalSteps.approverId,
        approverName: users.name,
        statusCode: expenseGroupApprovalSteps.statusCode,
        approvedAt: expenseGroupApprovalSteps.approvedAt,
        comment: expenseGroupApprovalSteps.comment,
      })
      .from(expenseGroupApprovalSteps)
      .innerJoin(users, eq(users.id, expenseGroupApprovalSteps.approverId))
      .where(eq(expenseGroupApprovalSteps.groupExpenseApprovalId, groupExpenseApprovalId))
      .orderBy(expenseGroupApprovalSteps.stepOrder);

    return { success: true, data: rows };
  } catch (error) {
    console.error('経費承認ステップ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('データ取得に失敗しました。') };
  }
};
