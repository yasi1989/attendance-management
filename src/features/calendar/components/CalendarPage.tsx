'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { addDays, addMonths, eachDayOfInterval, endOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';
import { useState } from 'react';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  const startDay = startDate.getDay();
  const endDay = endDate.getDay();

  const prevMonthDays = startDay !== 0 ? Array.from({ length: startDay }, (_, i) => subDays(startDate, startDay - i)) : [];
  const nextMonthDays = endDay !== 6 ? Array.from({ length: 6 - endDay }, (_, i) => addDays(endDate, endDay + i)) : [];

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];
  const weeks = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b border-muted/20">
        <CardTitle className="text-xl">出退勤申請</CardTitle>
        <CardDescription>出退勤の申請および履歴を確認できます。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {weeks.map((week, index) => (
            <div key={index}>{week.map((day, dayIndex) => <div key={dayIndex}>{day.getDate()}</div>)}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarPage;
