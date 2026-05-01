import { fetchMonthlyAttendance } from '@/features/attendance/calendar/api/fetches';
import CalendarPresentational from './presentational';

type CalendarDataLoaderProps = {
  year: number;
  month: number;
};

const CalendarContainer = async ({ year, month }: CalendarDataLoaderProps) => {
  const result = await fetchMonthlyAttendance(year, month);
  if (!result.success) throw result.error;

  return <CalendarPresentational initialData={result.data} initialYear={year} initialMonth={month} />;
};

export default CalendarContainer;