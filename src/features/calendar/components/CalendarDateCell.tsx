import { cn } from '@/lib/utils';
import { isSameMonth, isSaturday, isSunday, isToday } from 'date-fns';

type CalendarDateCellProps = {
  day: Date;
  currentDate: Date;
};

const CalendarDateCell = ({ day, currentDate }: CalendarDateCellProps) => {
  return (
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
  );
};

export default CalendarDateCell;
