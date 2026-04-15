import { HOLIDAY_CATEGORIES_WITH_ALL } from '@/consts/holiday';
import { fetchCompanyHolidays, fetchNationalHolidays } from '@/features/admin/holidays/api/fetches';
import { HolidayDisplay } from '@/features/admin/holidays/type/holidaysDisplayType';
import { HolidayCategoryTypeWithAll } from '@/types/holiday';
import HolidaysPresentational from './presentational';

type HolidaysContainerProps = {
  year: number;
  category: HolidayCategoryTypeWithAll;
};

const HolidaysContainer = async ({ year, category }: HolidaysContainerProps) => {
  const getHolidays = async (): Promise<HolidayDisplay[]> => {
    if (category === HOLIDAY_CATEGORIES_WITH_ALL.ALL.value) {
      const [companyResult, nationalResult] = await Promise.all([
        fetchCompanyHolidays(year),
        fetchNationalHolidays(year),
      ]);
      if (!companyResult.success) throw companyResult.error;
      if (!nationalResult.success) throw nationalResult.error;

      return [...companyResult.data, ...nationalResult.data].sort(
        (a, b) => a.holidayDate.getTime() - b.holidayDate.getTime(),
      );
    } else if (category === HOLIDAY_CATEGORIES_WITH_ALL.COMPANY.value) {
      const result = await fetchCompanyHolidays(year);
      if (!result.success) throw result.error;
      return result.data;
    } else if (category === HOLIDAY_CATEGORIES_WITH_ALL.NATIONAL.value) {
      const result = await fetchNationalHolidays(year);
      if (!result.success) throw result.error;
      return result.data;
    }
    return [];
  };

  const holidays = await getHolidays();
  return <HolidaysPresentational holidays={holidays} currentYear={year} currentCategory={category} />;
};

export default HolidaysContainer;