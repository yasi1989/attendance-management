import { fetchMonthlyAttendance } from '@/features/attendance/calendar/api/fetches';
import CalendarPresentational from './presentational';

type CalendarDataLoaderProps = {
  year: number;
  month: number;
};

const CalendarContainer = async ({ year, month }: CalendarDataLoaderProps) => {
  const initialData = await fetchMonthlyAttendance(year, month);
  return <CalendarPresentational initialData={initialData} initialYear={year} initialMonth={month} />;
};

export default CalendarContainer;
