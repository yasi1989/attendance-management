'use server';
import { endOfYear, startOfYear } from 'date-fns';
import { HOLIDAY_CATEGORIES } from '@/consts/holiday';
import { URLS } from '@/consts/urls';
import { requireCompanyAdmin } from '@/features/auth/lib/authRoleUtils';
import { Holiday } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';

export const fetchCompanyHolidays = async (year: number): Promise<Holiday[]> => {
  try {
    const { user } = await requireCompanyAdmin();
    const startDate = startOfYear(new Date(year, 0, 1));
    const endDate = endOfYear(new Date(year, 11, 31));
    return await db.query.holidays.findMany({
      where: (holidays, { eq, and, gte, lte }) =>
        and(
          eq(holidays.companyId, user.companyId),
          gte(holidays.holidayDate, startDate),
          lte(holidays.holidayDate, endDate),
        ),
      orderBy: (holidays, { desc }) => [desc(holidays.createdAt)],
    });
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    throw error;
  }
};

export const fetchNationalHolidays = async (year: number): Promise<Holiday[]> => {
  try {
    const response = await fetch(`${URLS.API_HOLIDAYS}/${year}`);
    if (!response.ok) {
      throw new Error('国民の祝日データ取得に失敗しました。');
    }
    const data = await response.json();
    return data.map(
      (h: { name: string; date: string }): Holiday => ({
        id: `national-${h.date}`,
        name: h.name,
        holidayDate: new Date(h.date),
        type: HOLIDAY_CATEGORIES.NATIONAL.value,
        companyId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    throw error;
  }
};
