'use server';
import { and, eq, ne } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { HOLIDAY_CATEGORIES } from '@/consts/holiday';
import { URLS } from '@/consts/urls';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { holidays } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { HolidaySchema } from '../lib/formSchema';
import { requireHolidayManagement } from '../lib/roleGuard';

export const addHolidayAction = async (values: z.infer<typeof HolidaySchema>): Promise<ActionStateResult> => {
  try {
    const { name, holidayDate } = values;
    const user = await requireHolidayManagement();
    const existHoliday = await db.query.holidays.findFirst({
      where: and(eq(holidays.companyId, user.companyId), eq(holidays.holidayDate, holidayDate)),
    });
    if (existHoliday) {
      return {
        success: false,
        error: 'この日付の祝日は既に登録されています。',
      };
    }
    await db.insert(holidays).values({
      name,
      holidayDate,
      companyId: user.companyId,
      type: HOLIDAY_CATEGORIES.COMPANY.value,
    });
    revalidatePath(URLS.ROOT, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const editHolidayAction = async (values: z.infer<typeof HolidaySchema>): Promise<ActionStateResult> => {
  try {
    const { id, name, holidayDate } = values;
    const user = await requireHolidayManagement();
    const existHoliday = await db.query.holidays.findFirst({
      where: and(eq(holidays.companyId, user.companyId), eq(holidays.holidayDate, holidayDate), ne(holidays.id, id)),
    });
    if (existHoliday) {
      return {
        success: false,
        error: 'この日付の祝日は既に登録されています。',
      };
    }
    await db
      .update(holidays)
      .set({ name, holidayDate, companyId: user.companyId, type: HOLIDAY_CATEGORIES.COMPANY.value })
      .where(eq(holidays.id, id));
    revalidatePath(URLS.ROOT, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const deleteHolidayAction = async (id: string): Promise<ActionStateResult> => {
  try {
    const user = await requireHolidayManagement();
    const result = await db.delete(holidays).where(and(eq(holidays.id, id), eq(holidays.companyId, user.companyId)));
    if (result.rowCount === 0) {
      return { success: false, error: '祝日が見つかりませんでした。' };
    }
    revalidatePath(URLS.ROOT, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
