import { cn } from '@/lib/utils';
import { WEEKDAYS_JP } from '../const/const';

const WeekDayHeader = () => {
  return (
    <>
      {WEEKDAYS_JP.map((day, i) => (
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
    </>
  );
};

export default WeekDayHeader;
