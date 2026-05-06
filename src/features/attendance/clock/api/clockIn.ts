'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { URLS } from '@/consts/urls';
import { nowToMinutes, todayJST } from '@/lib/date';
import { db } from '@/lib/db/drizzle';
import { attendances } from '@/lib/db/schema';
import { CLOCK_BLOCKED_APPROVAL_STATUSES, CLOCK_USER_TYPE } from '../consts/constants';
import { fetchMonthlyApprovalStatusCode } from '../lib/fetchMonthlyApprovalStatusCode';
import { getClockUserContext } from '../lib/getClockUserContext';
import { ClockInResult } from '../types/types';

export const clockIn = async (): Promise<ClockInResult> => {
  const session = await auth();

  if (!session?.user?.id) return { success: false, error: '認証エラーが発生しました' };

  const context = await getClockUserContext(session.user.id);

  const today = todayJST();

  if (context.type === CLOCK_USER_TYPE.WITH_COMPANY) {
    const statusCode = await fetchMonthlyApprovalStatusCode(context.userId, context.companyId);
    const label = CLOCK_BLOCKED_APPROVAL_STATUSES[statusCode as keyof typeof CLOCK_BLOCKED_APPROVAL_STATUSES];
    if (label) return { success: false, error: `${label}のため変更できません` };
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
