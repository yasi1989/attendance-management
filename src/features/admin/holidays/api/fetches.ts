import { getCompanyHolidays } from '@/features/admin/holidays/lib/holidays';
import { Holiday } from '@/lib/actionTypes';
import { Result } from '@/lib/result';
import { getNationalHolidays } from '../lib/holidays';
import { requireHolidayManagement } from '../lib/roleGuard';
import { NationalHolidayDisplay } from '../type/holidaysDisplayType';

export const fetchCompanyHolidays = async (year: number): Promise<Result<Holiday[]>> => {
  const authResult = await requireHolidayManagement();
  if (!authResult.success) return { success: false, error: authResult.error };

  try {
    const data = await getCompanyHolidays({ companyId: authResult.data.companyId, year });
    return { success: true, data };
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('データ取得に失敗しました。') };
  }
};

export const fetchNationalHolidays = async (year: number): Promise<Result<NationalHolidayDisplay[]>> => {
  try {
    const data = await getNationalHolidays({ year });
    return { success: true, data };
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('データ取得に失敗しました。') };
  }
};