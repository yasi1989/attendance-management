'use client';

import { Card, CardContent } from '@/components/ui/card';
import CalendarGrid from '@/features/attendance/calendar/components/CalendarGrig';
import CalendarHeader from '@/features/attendance/calendar/components/CalendarHeader';
import CalendarMonthlySummary from '@/features/attendance/calendar/components/CalendarMonthlySummary';
import { useCalendarNavigation } from '@/features/attendance/calendar/hooks/useCalendarNavigation';
import { FetchMonthlyAttendanceDataResponse } from '@/features/attendance/calendar/types/fetchResultResponse';

interface CalendarPresentationalProps {
  initialData: FetchMonthlyAttendanceDataResponse;
  initialYear: number;
  initialMonth: number;
}

const CalendarPresentational = ({ initialData, initialYear, initialMonth }: CalendarPresentationalProps) => {
  const { currentYear, currentMonth, previousMonth, nextMonth, goToToday } = useCalendarNavigation(
    initialYear,
    initialMonth,
  );

  const currentDate = new Date(currentYear, currentMonth - 1, 1);
  const monthlyStatus = initialData.monthlyAttendanceApproval?.statusCode;

  return (
    <div className="relative">
      <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden rounded-2xl ring-1 ring-gray-200/50 dark:ring-gray-800/50">
        <CalendarHeader
          currentDate={currentDate}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
          goToToday={goToToday}
          monthlyStatus={monthlyStatus}
          canSubmit={initialData.monthlyAttendanceSummary.canSubmit}
        />
        <CardContent className="p-0">
          <CalendarGrid
            currentYear={currentYear}
            currentMonth={currentMonth}
            currentDate={currentDate}
            initialData={initialData}
            monthlyStatus={monthlyStatus}
          />
        </CardContent>
        <CalendarMonthlySummary summary={initialData.monthlyAttendanceSummary} />
      </Card>
    </div>
  );
};

export default CalendarPresentational;
