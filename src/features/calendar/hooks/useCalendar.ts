import { useState } from 'react';
import { addDays, addMonths, eachDayOfInterval, endOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const createCalendarDates = (date: Date) => {
    const sDate = startOfMonth(date);
    const eDate = endOfMonth(date);
    const daysInMonth = eachDayOfInterval({ start: sDate, end: eDate });

    const sDay = sDate.getDay();
    const eDay = eDate.getDay();

    const prevMonthDays = sDay !== 0 ? Array.from({ length: sDay }, (_, i) => subDays(sDate, sDay - i)) : [];
    const nextMonthDays = eDay !== 6 ? Array.from({ length: 6 - eDay }, (_, i) => addDays(eDate, i + 1)) : [];

    const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];
    const weeks = Array.from({ length: Math.ceil(allDays.length / 7) }, (_, i) => allDays.slice(i * 7, (i + 1) * 7));
    return { weeks };
  };

  const { weeks } = createCalendarDates(currentDate);
  const previousMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
  const nextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));
  const goToToday = () => setCurrentDate(new Date());

  return {
    currentDate,
    previousMonth,
    nextMonth,
    goToToday,
    weeks,
  };
};
