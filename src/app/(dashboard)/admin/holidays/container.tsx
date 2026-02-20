import { fetchHolidays } from '@/features/admin/holidays/api/fetches';
import { HolidayCategoryTypeWithAll } from '@/types/holiday';
import HolidaysPresentational from './presentational';

type HolidaysContainerProps = {
  year: number;
  category: HolidayCategoryTypeWithAll;
};

const HolidaysContainer = async ({ year, category }: HolidaysContainerProps) => {
  const holidays = await fetchHolidays(year, category);
  return <HolidaysPresentational holidays={holidays} currentYear={year} currentCategory={category} />;
};

export default HolidaysContainer;
