import { fetchHolidays } from "@/features/company-admin/holiday/services/fetchHolidays";
import HolidaysForm from "@/features/company-admin/holiday/components/HolidaysForm";

const HolidayPage = () => {
  const holidays = fetchHolidays();
  return <HolidaysForm data={holidays} />;
}

export default HolidayPage