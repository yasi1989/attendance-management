'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { URLS } from '@/consts/urls';
import { db } from '@/lib/db/drizzle';
import { attendances, monthlyAttendanceApprovals } from '@/lib/db/schema';
import { nowToMinutes, thisMonthJST, todayJST } from '../lib/dateUtils';
import { getClockUserContext } from '../lib/getClockUserContext';
import { ClockInResult } from '../types/types';

export const clockIn = async (): Promise<ClockInResult> => {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: '認証エラーが発生しました' };

  const context = await getClockUserContext(session.user.id);

  if (context.type === 'system_admin') {
    return { success: false, error: '認証エラーが発生しました' };
  }

  const today = todayJST();

  if (context.type === 'with_company') {
    const thisMonth = thisMonthJST();

    const approval = await db.query.monthlyAttendanceApprovals.findFirst({
      where: and(
        eq(monthlyAttendanceApprovals.userId, context.userId),
        eq(monthlyAttendanceApprovals.companyId, context.companyId),
        eq(monthlyAttendanceApprovals.targetMonth, thisMonth),
      ),
      columns: { statusCode: true },
    });

    if (approval?.statusCode === 'Approved') {
      return { success: false, error: '承認済みのため変更できません' };
    }
    if (approval?.statusCode === 'Submitted') {
      return { success: false, error: '申請済みのため変更できません' };
    }
  }

  const existing = await db.query.attendances.findFirst({
    where: and(eq(attendances.userId, context.userId), eq(attendances.workDate, today)),
    columns: { startTime: true },
  });

  if (existing?.startTime != null) {
    return { success: false, error: '既に出勤済みです' };
  }

  const startTime = nowToMinutes();

  await db.insert(attendances).values({
    userId: context.userId,
    workDate: today,
    startTime,
    attendanceType: 'Work',
  });

  revalidatePath(URLS.ROOT, 'layout');

  return { success: true, startTime };
};
