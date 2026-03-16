'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { URLS } from '@/consts/urls';
import { requireAttendanceAccess } from '@/features/auth/lib/authRoleUtils';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { attendances } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { ensureAttendanceOwner, ensureMonthlyStatusEditable } from '../dialog/lib/actionValidate';
import { AttendanceFormSchema } from '../dialog/lib/formSchema';

export const createAttendanceAction = async (
  values: z.infer<typeof AttendanceFormSchema>,
): Promise<ActionStateResult> => {
  try {
    const { user } = await requireAttendanceAccess();
    const { date, attendanceType, isHalfDay, halfDayType, startTime, endTime, breakTime, comment } = values;

    const statusError = await ensureMonthlyStatusEditable(user.id, user.companyId, date);
    if (statusError) return statusError;

    const existing = await db.query.attendances.findFirst({
      where: (t, { and, eq }) => and(eq(t.userId, user.id), eq(t.workDate, date)),
    });
    if (existing) {
      return { success: false, error: 'この日付の勤怠データはすでに存在します。' };
    }

    await db.insert(attendances).values({
      userId: user.id,
      workDate: date,
      attendanceType,
      isHalfDay,
      halfDayType,
      startTime,
      endTime,
      breakTime,
      comment,
    });

    revalidatePath(URLS.ROOT, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const updateAttendanceAction = async (
  attendanceId: string,
  values: z.infer<typeof AttendanceFormSchema>,
): Promise<ActionStateResult> => {
  try {
    const { user } = await requireAttendanceAccess();
    const { date, attendanceType, isHalfDay, halfDayType, startTime, endTime, breakTime, comment } = values;

    const ownerError = await ensureAttendanceOwner(attendanceId, user.id);
    if (ownerError) return ownerError;

    const statusError = await ensureMonthlyStatusEditable(user.id, user.companyId, date);
    if (statusError) return statusError;

    const result = await db
      .update(attendances)
      .set({
        attendanceType,
        isHalfDay,
        halfDayType,
        startTime,
        endTime,
        breakTime,
        comment,
      })
      .where(and(eq(attendances.id, attendanceId), eq(attendances.userId, user.id)));

    if (result.rowCount === 0) {
      return { success: false, error: '勤怠データが見つかりませんでした。' };
    }

    revalidatePath(URLS.ROOT, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const deleteAttendanceAction = async (attendanceId: string): Promise<ActionStateResult> => {
  try {
    const { user } = await requireAttendanceAccess();

    const ownerError = await ensureAttendanceOwner(attendanceId, user.id);
    if (ownerError) return ownerError;

    const attendance = await db.query.attendances.findFirst({
      where: (t, { and, eq }) => and(eq(t.id, attendanceId), eq(t.userId, user.id)),
    });
    if (!attendance) {
      return { success: false, error: '勤怠データが見つかりませんでした。' };
    }

    const statusError = await ensureMonthlyStatusEditable(user.id, user.companyId, attendance.workDate);
    if (statusError) return statusError;

    const result = await db
      .delete(attendances)
      .where(and(eq(attendances.id, attendanceId), eq(attendances.userId, user.id)));

    if (result.rowCount === 0) {
      return { success: false, error: '勤怠データが見つかりませんでした。' };
    }

    revalidatePath(URLS.ROOT, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
