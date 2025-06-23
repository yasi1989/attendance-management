import { fetchHolidays } from "@/features/admin/holidays/services/fetchHolidays";
import HolidaysForm from "@/features/admin/holidays/components/HolidaysForm";

const HolidayPage = () => {
  const holidays = fetchHolidays();
  return <HolidaysForm data={holidays} />;
}

export default HolidayPage