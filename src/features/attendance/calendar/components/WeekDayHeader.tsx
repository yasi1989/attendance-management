import { cn } from '@/lib/utils';
import { WEEKDAYS_JP } from '../const/calendarConst';

const WeekDayHeader = () => {
  return (
    <>
      {WEEKDAYS_JP.map((day, i) => (
        <div
          className={cn(
            'border-r border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30',
            'py-4 text-center text-sm font-semibold',
            'last:border-r-0',
            i === 0
              ? 'text-red-600 dark:text-red-400'
              : i === 6
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300',
          )}
          key={day}
        >
          <span className="hidden sm:inline">{day}曜日</span>
          <span className="sm:hidden">{day}</span>
        </div>
      ))}
    </>
  );
};

export default WeekDayHeader;
