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
      const [companyHolidays, nationalHolidays] = await Promise.all([
        fetchCompanyHolidays(year),
        fetchNationalHolidays(year),
      ]);
      return [...companyHolidays, ...nationalHolidays].sort(
        (a, b) => a.holidayDate.getTime() - b.holidayDate.getTime(),
      );
    } else if (category === HOLIDAY_CATEGORIES_WITH_ALL.COMPANY.value) {
      return fetchCompanyHolidays(year);
    } else if (category === HOLIDAY_CATEGORIES_WITH_ALL.NATIONAL.value) {
      return fetchNationalHolidays(year);
    }
    return [];
  };

  const holidays = await getHolidays();
  return <HolidaysPresentational holidays={holidays} currentYear={year} currentCategory={category} />;
};

export default HolidaysContainer;
