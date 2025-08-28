
import { fetchHolidays } from "@/features/admin/holidays/api/fetches";
import HolidaysPresentational from "./presentational";

type HolidaysContainerProps = {
  year: number;
};

const HolidaysContainer = async ({ year }: HolidaysContainerProps) => {
  const holidays = await fetchHolidays(year);
  return <HolidaysPresentational holidays={holidays} currentYear={year} />;
};

export default HolidaysContainer;
