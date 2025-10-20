import { fetchCompanyHolidays, fetchNationalHolidays } from '@/features/admin/holidays/api/fetches';
import HolidaysPresentational from './presentational';
import { HolidayCategoryTypeWithAll } from '@/types/holiday';
import { HOLIDAY_CATEGORIES_WITH_ALL } from '@/consts/holiday';
import { Holiday } from '@/lib/actionTypes';

type HolidaysContainerProps = {
  year: number;
  category: HolidayCategoryTypeWithAll;
};

const HolidaysContainer = async ({ year, category }: HolidaysContainerProps) => {
  const holidays: Holiday[] = [];
  if (category === HOLIDAY_CATEGORIES_WITH_ALL.ALL.value) {
    const [companyHolidays, nationalHolidays] = await Promise.all([
      fetchCompanyHolidays(year),
      fetchNationalHolidays(year),
    ]);
    holidays.push(...companyHolidays, ...nationalHolidays);
    holidays.sort((a, b) => a.holidayDate.getTime() - b.holidayDate.getTime());
  } else if (category === HOLIDAY_CATEGORIES_WITH_ALL.COMPANY.value) {
    const companyHolidays = await fetchCompanyHolidays(year);
    holidays.push(...companyHolidays);
  } else if (category === HOLIDAY_CATEGORIES_WITH_ALL.NATIONAL.value) {
    const nationalHolidays = await fetchNationalHolidays(year);
    holidays.push(...nationalHolidays);
  }
  return <HolidaysPresentational holidays={holidays} currentYear={year} currentCategory={category} />;
};

export default HolidaysContainer;
