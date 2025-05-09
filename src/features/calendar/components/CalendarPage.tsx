'use client';
import { Card, CardContent } from '@/components/ui/card';
import CalendarHeader from './CalendarHeader';
import { useCalendar } from '../hooks/useCalendar';
import WeekDayHeader from './WeekDayHeader';
import CalendarDateCell from './CalendarDateCell';

const CalendarPage = () => {
  const { currentDate, previousMonth, nextMonth, goToToday, weeks } = useCalendar();

  return (
    <Card className="shadow-lg border-0">
      <CalendarHeader
        currentDate={currentDate}
        previousMonth={previousMonth}
        nextMonth={nextMonth}
        goToToday={goToToday}
      />
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          <WeekDayHeader />
          {weeks.map((week) =>
            week.map((day) => <CalendarDateCell key={day.toISOString()} day={day} currentDate={currentDate} />),
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarPage;
