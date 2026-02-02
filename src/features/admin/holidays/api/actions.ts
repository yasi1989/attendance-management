'use server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { HOLIDAY_CATEGORIES } from '@/consts/holiday';
import { URLS } from '@/consts/urls';
import { requireCompanyAdmin } from '@/features/auth/lib/authRoleUtils';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { holidays } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { HolidaySchema } from '../lib/formSchema';

export const addHolidayAction = async (values: z.infer<typeof HolidaySchema>): Promise<ActionStateResult> => {
  try {
    const { name, holidayDate } = values;
    const { user } = await requireCompanyAdmin();
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
    revalidatePath(URLS.ADMIN_HOLIDAYS);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const editHolidayAction = async (values: z.infer<typeof HolidaySchema>): Promise<ActionStateResult> => {
  try {
    const { id, name, holidayDate } = values;
    const { user } = await requireCompanyAdmin();
    const existHoliday = await db.query.holidays.findFirst({
      where: and(eq(holidays.companyId, user.companyId), eq(holidays.holidayDate, holidayDate)),
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
    revalidatePath(URLS.ADMIN_HOLIDAYS);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const deleteHolidayAction = async (id: string): Promise<ActionStateResult> => {
  try {
    await requireCompanyAdmin();
    const result = await db.delete(holidays).where(eq(holidays.id, id));
    if (result.rowCount === 0) {
      return { success: false, error: '祝日が見つかりませんでした。' };
    }
    revalidatePath(URLS.ADMIN_HOLIDAYS);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
