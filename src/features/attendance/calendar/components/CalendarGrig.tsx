import CalendarWeekdayHeader from './CalendarWeekdayHeader';
import CalendarDateCell from './CalendarDateCell';
import AttendanceDialog from '../dialog/components/AttendanceDialog';
import { isSameDay, isSameMonth } from 'date-fns';
import { AttendanceDataResponse } from '../types/attendance';
import { generateCalendarWeeks } from '../lib/calenderUtils';
import { formatDateToISOString } from '@/lib/date';
import { StatusType } from '@/types/statusType';
import { canPerformRequest } from '@/lib/status';

type CalendarGridProps = {
  currentYear: number;
  currentMonth: number;
  currentDate: Date;
  initialData: AttendanceDataResponse;
  monthlyStatus: StatusType;
};

const CalendarGrid = ({ currentYear, currentMonth, currentDate, initialData, monthlyStatus }: CalendarGridProps) => {
  const weeks = generateCalendarWeeks(currentYear, currentMonth);
  const currentYearMonth = new Date(currentYear, currentMonth - 1, 1);
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
          const isDisabled = monthlyStatus && !canPerformRequest(monthlyStatus);
          const isDateCellCurrentMonth = isSameMonth(day, currentYearMonth);
          return isDateCellCurrentMonth ? (
            <AttendanceDialog
              key={dayKey}
              day={day}
              attendanceData={targetDate}
              holidayInfo={holidayInfo}
              isDisabled={isDisabled}
              triggerContent={
                <CalendarDateCell
                  key={dayKey}
                  day={day}
                  currentDate={currentDate}
                  attendanceData={targetDate}
                  holidayInfo={holidayInfo}
                  isDateCellCurrentMonth={isDateCellCurrentMonth}
                />
              }
            />
          ) : (
            <CalendarDateCell
              key={dayKey}
              day={day}
              currentDate={currentDate}
              attendanceData={targetDate}
              holidayInfo={holidayInfo}
              isDateCellCurrentMonth={isDateCellCurrentMonth}
            />
          );
        }),
      )}
    </div>
  );
};

export default CalendarGrid;
