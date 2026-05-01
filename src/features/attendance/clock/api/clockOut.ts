'use server';

import { and, eq, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { URLS } from '@/consts/urls';
import { db } from '@/lib/db/drizzle';
import { attendances, monthlyAttendanceApprovals } from '@/lib/db/schema';
import { CLOCK_BLOCKED_APPROVAL_STATUSES, CLOCK_USER_TYPE } from '../consts/constants';
import { nowToMinutes, thisMonthJST, todayJST } from '../lib/dateUtils';
import { getClockUserContext } from '../lib/getClockUserContext';
import { ClockOutResult } from '../types/types';

export const clockOut = async (): Promise<ClockOutResult> => {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: '認証エラーが発生しました' };

  const context = await getClockUserContext(session.user.id);

  const today = todayJST();

  if (context.type === CLOCK_USER_TYPE.WITH_COMPANY) {
    const thisMonth = thisMonthJST();

    const approval = await db.query.monthlyAttendanceApprovals.findFirst({
      where: and(
        eq(monthlyAttendanceApprovals.userId, context.userId),
        eq(monthlyAttendanceApprovals.companyId, context.companyId),
        eq(monthlyAttendanceApprovals.targetMonth, thisMonth),
      ),
      columns: { statusCode: true },
    });

    const label = CLOCK_BLOCKED_APPROVAL_STATUSES[approval?.statusCode as keyof typeof CLOCK_BLOCKED_APPROVAL_STATUSES];
    if (label) return { success: false, error: `${label}のため変更できません` };
  }

  const existing = await db.query.attendances.findFirst({
    where: and(eq(attendances.userId, context.userId), eq(attendances.workDate, today)),
    columns: { id: true, startTime: true, endTime: true },
  });

  if (!existing || existing.startTime == null) {
    return { success: false, error: '出勤打刻がありません' };
  }
  if (existing.endTime != null) {
    return { success: false, error: '既に退勤済みです' };
  }

  const endTime = nowToMinutes();

  await db
    .update(attendances)
    .set({ endTime })
    .where(and(eq(attendances.userId, context.userId), eq(attendances.workDate, today), isNull(attendances.endTime)));

  revalidatePath(URLS.ROOT, 'layout');

  return { success: true, endTime };
};
