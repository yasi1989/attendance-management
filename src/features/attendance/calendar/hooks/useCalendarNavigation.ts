import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { URL_PARAMS } from '@/consts/urls';
import { isValidMonth, isValidYear } from '@/features/attendance/calendar/lib/calendarUtils';

export const useCalendarNavigation = (initialYear: number, initialMonth: number) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentYear, setCurrentYear] = useState(initialYear);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  useEffect(() => {
    const yearParam = searchParams.get(URL_PARAMS.calendar.YEAR);
    const monthParam = searchParams.get(URL_PARAMS.calendar.MONTH);

    if (yearParam && monthParam) {
      const year = Number(yearParam);
      const month = Number(monthParam);

      if (isValidYear(year) && isValidMonth(month)) {
        setCurrentYear(year);
        setCurrentMonth(month);
      }
    }
  }, [searchParams]);

  const navigateToMonth = useCallback(
    (year: number, month: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(URL_PARAMS.calendar.YEAR, year.toString());
      params.set(URL_PARAMS.calendar.MONTH, month.toString());
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
  return {
    currentYear,
    currentMonth,
    previousMonth,
    nextMonth,
    goToToday,
  };
};
