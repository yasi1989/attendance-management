'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { STATUS } from '@/consts/status';
import { URLS } from '@/consts/urls';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { attendanceApprovalSteps, monthlyAttendanceApprovals } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { resolveApprover } from '@/lib/resolveApprover';
import { requireAttendanceAccess } from '../lib/roleGuard';

type SubmitMonthlyAttendanceParams = {
  year: number;
  month: number;
  comment?: string;
};

export const submitMonthlyAttendanceAction = async ({
  year,
  month,
  comment,
}: SubmitMonthlyAttendanceParams): Promise<ActionStateResult> => {
  try {
    const authResult = await requireAttendanceAccess();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const user = authResult.data;

    if (!user.departmentId) {
      return { success: false, error: '部署が設定されていません。管理者にお問い合わせください。' };
    }

    const targetMonth = new Date(year, month - 1, 1);

    const existing = await db.query.monthlyAttendanceApprovals.findFirst({
      where: (t, { and, eq }) => and(eq(t.userId, user.id), eq(t.targetMonth, targetMonth)),
    });

    if (existing) {
      if (existing.statusCode === STATUS.SUBMITTED.value || existing.statusCode === STATUS.APPROVED.value) {
        return { success: false, error: 'この月はすでに申請済みです。' };
      }

      await db
        .update(monthlyAttendanceApprovals)
        .set({ statusCode: STATUS.SUBMITTED.value, submittedAt: new Date() })
        .where(eq(monthlyAttendanceApprovals.id, existing.id));
    }

    const approvers = await resolveApprover(user);
    if (approvers.length === 0) {
      return { success: false, error: '承認者が見つかりませんでした。管理者にお問い合わせください。' };
    }

    const [approval] = await db
      .insert(monthlyAttendanceApprovals)
      .values({
        userId: user.id,
        companyId: user.companyId,
        statusCode: STATUS.SUBMITTED.value,
        targetMonth,
        submittedAt: new Date(),
      })
      .returning();

    await db.insert(attendanceApprovalSteps).values(
      approvers.map((approver) => ({
        monthlyAttendanceApprovalId: approval.id,
        stepOrder: approver.stepOrder,
        approverId: approver.userId,
        statusCode: STATUS.SUBMITTED.value,
        comment: comment ?? null,
      })),
    );

    revalidatePath(URLS.ATTENDANCE_CALENDAR, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
