'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { isValidMonth, isValidYear } from '@/features/attendance/calendar/lib/calenderUtils';
import { AttendanceDataResponse } from '@/features/attendance/calendar/types/attendance';
import { generateCalendarWeeks } from '@/features/attendance/calendar/lib/calenderUtils';
import CalendarHeader from '@/features/attendance/calendar/components/CalendarHeader';
import WeekDayHeader from '@/features/attendance/calendar/components/WeekDayHeader';
import CalendarDateCell from '@/features/attendance/calendar/components/CalendarDateCell';
import CalendarFooter from '@/features/attendance/calendar/components/CalendarFooter';
import AttendanceDialog from '@/features/attendance/calendar/dialog/components/AttendanceDialog';
import { isSameDay } from 'date-fns';

interface CalendarPresentationalProps {
  initialData: AttendanceDataResponse;
  initialYear: number;
  initialMonth: number;
}

const CalendarPresentational = ({ initialData, initialYear, initialMonth }: CalendarPresentationalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentYear, setCurrentYear] = useState(initialYear);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  useEffect(() => {
    const yearParam = searchParams.get('year');
    const monthParam = searchParams.get('month');

    if (yearParam && monthParam) {
      const year = Number.parseInt(yearParam, 10);
      const month = Number.parseInt(monthParam, 10);

      if (isValidYear(year) && isValidMonth(month)) {
        setCurrentYear(year);
        setCurrentMonth(month);
      }
    }
  }, [searchParams]);

  const currentDate = new Date(currentYear, currentMonth - 1, 1);

  const weeks = generateCalendarWeeks(currentYear, currentMonth);

  const navigateToMonth = useCallback(
    (year: number, month: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('year', year.toString());
      params.set('month', month.toString());

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const previousMonth = useCallback(() => {
    const prevDate = new Date(currentYear, currentMonth - 2, 1);
    navigateToMonth(prevDate.getFullYear(), prevDate.getMonth() + 1);
  }, [currentYear, currentMonth, navigateToMonth]);

  const nextMonth = useCallback(() => {
    const nextDate = new Date(currentYear, currentMonth, 1);
    navigateToMonth(nextDate.getFullYear(), nextDate.getMonth() + 1);
  }, [currentYear, currentMonth, navigateToMonth]);

  const goToToday = useCallback(() => {
    const today = new Date();
    navigateToMonth(today.getFullYear(), today.getMonth() + 1);
  }, [navigateToMonth]);

  const monthlyStatus = initialData.monthlyAttendance.monthlyStatus || 'None';

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
          <div className="grid grid-cols-7 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/30 dark:to-gray-900">
            <WeekDayHeader />
            {weeks.map((week) =>
              week.map((day) => {
                const targetDate = initialData.monthlyAttendance?.attendanceData?.find((attendance) =>
                  isSameDay(attendance.date, day),
                );
                const holidayInfo = initialData.holidays?.find((holiday) => isSameDay(holiday.holidayDate, day));

                return (
                  <AttendanceDialog
                    key={day.toISOString()}
                    day={day}
                    attendanceData={targetDate}
                    holidayInfo={holidayInfo}
                    triggerContent={
                      <CalendarDateCell
                        key={day.toISOString()}
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
        </CardContent>
        <CalendarFooter />
      </Card>
    </div>
  );
};

export default CalendarPresentational;
