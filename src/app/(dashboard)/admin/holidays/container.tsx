import { fetchHolidays } from "@/features/admin/holidays/services/fetchHolidays";
import HolidaysPresentational from "./presentational";

type HolidaysContainerProps = {
  year: number;
};

const HolidaysContainer = async ({ year }: HolidaysContainerProps) => {
  const holidays = await fetchHolidays(year);
  return <HolidaysPresentational data={holidays} currentYear={year} />;
};

export default HolidaysContainer;
