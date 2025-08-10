import CalendarWeekdayHeader from './CalendarWeekdayHeader';
import CalendarDateCell from './CalendarDateCell';
import AttendanceDialog from '../dialog/components/AttendanceDialog';
import { isSameDay } from 'date-fns';
import { AttendanceDataResponse } from '../types/attendance';
import { generateCalendarWeeks } from '../lib/calenderUtils';
import { formatDateToISOString } from '@/lib/date';

type CalendarGridProps = {
  currentYear: number;
  currentMonth: number;
  currentDate: Date;
  initialData: AttendanceDataResponse;
};

const CalendarGrid = ({ currentYear, currentMonth, currentDate, initialData }: CalendarGridProps) => {
  const weeks = generateCalendarWeeks(currentYear, currentMonth);
  return (
    <div className="grid grid-cols-7 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/30 dark:to-gray-900">
      <CalendarWeekdayHeader />
      {weeks.map((week) =>
        week.map((day) => {
          const targetDate = initialData.monthlyAttendance?.attendanceData?.find((attendance) =>
            isSameDay(attendance.date, day),
          );
          const holidayInfo = initialData.holidays?.find((holiday) => isSameDay(holiday.holidayDate, day));
          const dayKey = formatDateToISOString(day);
          return (
            <AttendanceDialog
              key={dayKey}
              day={day}
              attendanceData={targetDate}
              holidayInfo={holidayInfo}
              triggerContent={
                <CalendarDateCell
                  key={dayKey}
                  day={day}
                  currentDate={currentDate}
                  attendanceData={targetDate}
                  holidayInfo={holidayInfo}
                />
              }
            />
          );
        }),
      )}
    </div>
  );
};

export default CalendarGrid;
