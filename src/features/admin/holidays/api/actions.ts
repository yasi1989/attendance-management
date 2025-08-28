'use server';
import { db } from '@/lib/db/drizzle';
import z from 'zod';
import { HolidaySchema } from '../lib/formSchema';
import { ActionStateResult } from '@/lib/actionTypes';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { URLS } from '@/consts/urls';
import { actionErrorHandler } from '@/lib/errorHandler';
import { holidays, users } from '@/lib/db/schema';
import { auth } from '@/auth';

export const addHolidayAction = async (values: z.infer<typeof HolidaySchema>): Promise<ActionStateResult> => {
  try {
    const { name, holidayDate } = values;
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('ログインしてください');
    }
    const user = await db.query.users.findFirst({ where: eq(users.id, session.user.id) });
    if (!user) {
      throw new Error('ユーザーが見つかりません。');
    }
    if (!user?.companyId) {
      throw new Error('所属会社がありません。');
    }
    const companyId = user.companyId;
    const existHoliday = await db.query.holidays.findFirst({
      where: and(eq(holidays.companyId, companyId), eq(holidays.holidayDate, holidayDate)),
    });
    if (existHoliday) {
      return { success: false, error: 'この日付の祝日は既に登録されています。' };
    }
    await db.insert(holidays).values({ name, holidayDate, companyId });
    revalidatePath(URLS.ADMIN_HOLIDAYS);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
