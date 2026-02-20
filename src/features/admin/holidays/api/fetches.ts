'use server';
import { HOLIDAY_CATEGORIES_WITH_ALL } from '@/consts/holiday';
import { requireCompanyAdmin } from '@/features/auth/lib/authRoleUtils';
import { Holiday } from '@/lib/actionTypes';
import { HolidayCategoryTypeWithAll } from '@/types/holiday';
import { getAllHolidays, getCompanyHolidays, getNationalHolidays } from '../lib/holidays';

export const fetchHolidays = async (year: number, category: HolidayCategoryTypeWithAll): Promise<Holiday[]> => {
  const { user } = await requireCompanyAdmin();
  if (category === HOLIDAY_CATEGORIES_WITH_ALL.ALL.value) {
    return await getAllHolidays({ year, companyId: user.companyId });
  } else if (category === HOLIDAY_CATEGORIES_WITH_ALL.COMPANY.value) {
    return await getCompanyHolidays({ year, companyId: user.companyId });
  } else {
    return await getNationalHolidays({ year });
  }
};
