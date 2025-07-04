import { getAttendanceData } from '@/features/attendance/calendar/services/attendanceService';
import CalendarPresentational from './presentational';

type CalendarDataLoaderProps = {
  year: number;
  month: number;
};

const CalendarContainer = async ({ year, month }: CalendarDataLoaderProps) => {
  const attendanceData = await getAttendanceData(year, month);
  return <CalendarPresentational initialData={attendanceData} initialYear={year} initialMonth={month} />;
};

export default CalendarContainer;
