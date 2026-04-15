import { getCompanyHolidays } from '@/features/admin/holidays/lib/holidays';
import { requireCompanyAdmin } from '@/features/auth/lib/authRoleUtils';
import { Holiday } from '@/lib/actionTypes';
import { getNationalHolidays } from '../lib/holidays';
import { NationalHolidayDisplay } from '../type/holidaysDisplayType';

export const fetchCompanyHolidays = async (year: number): Promise<Holiday[]> => {
  try {
    const { user } = await requireCompanyAdmin();
    return getCompanyHolidays({ companyId: user.companyId, year });
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    throw error;
  }
};

export const fetchNationalHolidays = async (year: number): Promise<NationalHolidayDisplay[]> => {
  try {
    return getNationalHolidays({ year });
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    throw error;
  }
};
