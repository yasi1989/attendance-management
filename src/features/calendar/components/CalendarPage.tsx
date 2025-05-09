'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  isSameMonth,
  isSaturday,
  isSunday,
  isToday,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const formatMonth = (date: Date) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  const startDay = startDate.getDay();
  const endDay = endDate.getDay();

  const prevMonthDays =
    startDay !== 0 ? Array.from({ length: startDay }, (_, i) => subDays(startDate, startDay - i)) : [];
  const nextMonthDays = endDay !== 6 ? Array.from({ length: 6 - endDay }, (_, i) => addDays(endDate, i + 1)) : [];

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];
  const weeks = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  const previousMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const nextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl font-bold">{formatMonth(currentDate)}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={previousMonth} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={goToToday} className="h-8">
              今日
            </Button>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {['日', '月', '火', '水', '木', '金', '土'].map((day, i) => (
            <div
              className={cn(
                'text-center text-sm font-medium',
                i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400',
              )}
              key={day}
            >
              {day}
            </div>
          ))}
          {weeks.map((week) =>
            week.map((day) => (
              <div
                className={cn(
                  'relative h-20 sm:h-24 rounded-lg text-sm p-1 transition-all',
                  isSameMonth(day, currentDate)
                    ? 'bg-white dark:bg-gray-800 shadow-sm hover:shadow'
                    : 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400',
                  isSaturday(day) && 'text-blue-500',
                  isSunday(day) && 'text-red-500',
                  isToday(day) && 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800',
                )}
                key={day.toISOString()}
              >
                {day.getDate()}
              </div>
            )),
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarPage;
