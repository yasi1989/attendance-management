import { HOLIDAY_CATEGORIES } from '@/consts/holiday';
import { URLS } from '@/consts/urls';
import { Holiday } from '@/lib/actionTypes';
import { getYearMonthRange, getYearRange } from '@/lib/date';
import { db } from '@/lib/db/drizzle';

export interface GetCompanyHolidaysParams {
  companyId: string;
  year: number;
  month?: number;
}

export interface GetNationalHolidaysParams {
  year: number;
  month?: number;
}

export interface GetAllHolidaysParams {
  year: number;
  month?: number;
  companyId?: string | null;
}

export const getCompanyHolidays = async ({ companyId, year, month }: GetCompanyHolidaysParams): Promise<Holiday[]> => {
  try {
    const { startDate, endDate } = month ? getYearMonthRange(year, month) : getYearRange(year);
    return await db.query.holidays.findMany({
      where: (holidays, { eq, and, gte, lte }) =>
        and(
          eq(holidays.companyId, companyId),
          gte(holidays.holidayDate, startDate),
          lte(holidays.holidayDate, endDate),
        ),
      orderBy: (holidays, { asc }) => [asc(holidays.holidayDate)],
    });
  } catch (error) {
    console.error('会社祝日データ取得に失敗しました。', error);
    throw error;
  }
};

export const getNationalHolidays = async ({ year, month }: GetNationalHolidaysParams): Promise<Holiday[]> => {
  try {
    const response = await fetch(`${URLS.API_HOLIDAYS}/${year}`);
    if (!response.ok) {
      throw new Error('国民の祝日データ取得に失敗しました。');
    }
    const data = await response.json();

    const allHolidays = data.map(
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

    if (month !== undefined) {
      return allHolidays.filter(
        (h: { holidayDate: { getMonth: () => number } }) => h.holidayDate.getMonth() === month - 1,
      );
    }

    return allHolidays;
  } catch (error) {
    console.error('国民の祝日データ取得に失敗しました。', error);
    throw error;
  }
};

export const getAllHolidays = async ({ year, month, companyId }: GetAllHolidaysParams): Promise<Holiday[]> => {
  try {
    const [nationalHolidays, companyHolidays] = await Promise.all([
      getNationalHolidays({ year, month }),
      companyId ? getCompanyHolidays({ companyId, year, month }) : Promise.resolve([]),
    ]);

    return [...nationalHolidays, ...companyHolidays].sort((a, b) => a.holidayDate.getTime() - b.holidayDate.getTime());
  } catch (error) {
    console.error('祝日データ取得に失敗しました。', error);
    throw error;
  }
};
