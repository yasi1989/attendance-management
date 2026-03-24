import { HOLIDAY_CATEGORIES } from '@/consts/holiday';
import { URLS } from '@/consts/urls';
import { Holiday } from '@/lib/actionTypes';
import { getYearMonthRange, getYearRange } from '@/lib/date';
import { db } from '@/lib/db/drizzle';
import { HolidayDisplay, NationalHolidayDisplay } from '../type/holidaysDisplayType';
import { NationalHolidayResponseSchema } from './fetchSchema';

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

export const getNationalHolidays = async ({
  year,
  month,
}: GetNationalHolidaysParams): Promise<NationalHolidayDisplay[]> => {
  try {
    const url = month
      ? `${URLS.API_HOLIDAYS}/${year}/${String(month).padStart(2, '0')}`
      : `${URLS.API_HOLIDAYS}/${year}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('国民の祝日データ取得に失敗しました。');
    }
    const data = await response.json();
    const parsed = NationalHolidayResponseSchema.safeParse(data);
    if (!parsed.success) {
      console.error('APIレスポンスの形式が不正です。', parsed.error);
      throw new Error('APIレスポンスの形式が不正です。');
    }
    return parsed.data.map(
      (h: { name: string; date: string }): NationalHolidayDisplay => ({
        id: `national-${h.date}`,
        name: h.name,
        holidayDate: new Date(h.date),
        type: HOLIDAY_CATEGORIES.NATIONAL.value,
        companyId: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  } catch (error) {
    console.error('国民の祝日データ取得に失敗しました。', error);
    throw error;
  }
};

export const getAllHolidays = async ({ year, month, companyId }: GetAllHolidaysParams): Promise<HolidayDisplay[]> => {
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
