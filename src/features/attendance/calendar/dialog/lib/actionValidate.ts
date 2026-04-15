import { ATTENDANCE_EDITABLE_STATUSES, STATUS } from '@/consts/status';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';

export const ensureMonthlyStatusEditable = async (
  userId: string,
  companyId: string | null,
  targetMonth: Date,
): Promise<ActionStateResult | null> => {
  const approval = await db.query.monthlyAttendanceApprovals.findFirst({
    where: (t, { and, eq }) =>
      companyId
        ? and(eq(t.userId, userId), eq(t.companyId, companyId), eq(t.targetMonth, targetMonth))
        : and(eq(t.userId, userId), eq(t.targetMonth, targetMonth)),
  });

  if (!approval) return null;

  if (!(ATTENDANCE_EDITABLE_STATUSES as readonly string[]).includes(approval.statusCode)) {
    return {
      success: false,
      error: `${STATUS.APPROVED.label}または${STATUS.SUBMITTED.label}のため編集できません。`,
    };
  }

  return null;
};

export const ensureAttendanceOwner = async (
  attendanceId: string,
  userId: string,
): Promise<ActionStateResult | null> => {
  const attendance = await db.query.attendances.findFirst({
    where: (t, { and, eq }) => and(eq(t.id, attendanceId), eq(t.userId, userId)),
  });

  if (!attendance) {
    return { success: false, error: '勤怠データが見つかりませんでした。' };
  }

  return null;
};
