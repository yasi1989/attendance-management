import { cn } from '@/lib/utils';
import { WEEKDAYS_WITH_STYLES } from '../const/calendar';

const CalendarWeekdayHeader = () => {
  return (
    <>
      {WEEKDAYS_WITH_STYLES.map((day) => (
        <div
          className={cn(
            'border-r border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30',
            'py-4 text-center text-sm font-semibold',
            'last:border-r-0',
            day.textColor,
          )}
          key={day.name}
        >
          <span className="hidden sm:inline">{day.fullName}</span>
          <span className="sm:hidden">{day.name}</span>
        </div>
      ))}
    </>
  );
};

export default CalendarWeekdayHeader;
