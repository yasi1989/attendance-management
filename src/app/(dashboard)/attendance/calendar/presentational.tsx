'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AttendanceDataResponse } from '@/features/attendance/calendar/types/attendance';
import CalendarHeader from '@/features/attendance/calendar/components/CalendarHeader';
import CalendarFooter from '@/features/attendance/calendar/components/CalendarFooter';
import { useCalendarNavigation } from '@/features/attendance/calendar/hooks/useCalendarNavigation';
import CalendarGrid from '@/features/attendance/calendar/components/CalendarGrig';

interface CalendarPresentationalProps {
  initialData: AttendanceDataResponse;
  initialYear: number;
  initialMonth: number;
}

const CalendarPresentational = ({ initialData, initialYear, initialMonth }: CalendarPresentationalProps) => {
  const { currentYear, currentMonth, previousMonth, nextMonth, goToToday } = useCalendarNavigation(
    initialYear,
    initialMonth,
  );

  const currentDate = new Date(currentYear, currentMonth - 1, 1);
  const monthlyStatus = initialData.monthlyAttendance.monthlyStatus;

  return (
    <div className="relative">
      <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden rounded-2xl ring-1 ring-gray-200/50 dark:ring-gray-800/50">
        <CalendarHeader
          currentDate={currentDate}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
          goToToday={goToToday}
          monthlyStatus={monthlyStatus}
          canSubmit={initialData.monthlyAttendance.canSubmit}
        />
        <CardContent className="p-0">
          <CalendarGrid
            currentYear={currentYear}
            currentMonth={currentMonth}
            currentDate={currentDate}
            initialData={initialData}
          />
        </CardContent>
        <CalendarFooter />
      </Card>
    </div>
  );
};

export default CalendarPresentational;
