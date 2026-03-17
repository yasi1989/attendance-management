import { isSameMonth, isSaturday, isSunday, isToday } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { STATUS } from '@/consts/status';
import { Attendance, Holiday } from '@/lib/actionTypes';
import { getStatusByValue } from '@/lib/status';
import { cn } from '@/lib/utils';
import { StatusType } from '@/types/statusType';
import { CalendarDateCellContent } from './CalendarDateCellContent';

type CalendarDateCellProps = {
  day: Date;
  currentDate: Date;
  attendanceData?: Attendance;
  holidayInfo?: Holiday;
  isDateCellCurrentMonth?: boolean;
  monthlyStatus?: StatusType;
};

const STATUS_COLORS: Record<StatusType, string> = {
  [STATUS.PENDING.value]:
    'ring-blue-200 dark:ring-blue-800 from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
  [STATUS.SUBMITTED.value]:
    'ring-orange-200 dark:ring-orange-800 from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30',
  [STATUS.REJECTED.value]:
    'ring-red-200 dark:ring-red-800 from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30',
  [STATUS.APPROVED.value]:
    'ring-green-200 dark:ring-green-800 from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30',
};

const getStatusStyles = (status?: StatusType) => {
  const statusInfo = getStatusByValue(status);
  if (!statusInfo) return '';
  return cn(STATUS_COLORS[statusInfo.value], 'ring-2 bg-linear-to-br');
};

const CalendarDateCell = ({
  day,
  currentDate,
  attendanceData,
  holidayInfo,
  isDateCellCurrentMonth,
  monthlyStatus,
}: CalendarDateCellProps) => {
  const isCurrentMonth = isSameMonth(day, currentDate);
  const isWeekend = isSaturday(day) || isSunday(day);
  const isTodayDate = isToday(day);

  return (
    <div
      className={cn(
        'relative h-24 sm:h-28 lg:h-32 p-2 sm:p-3',
        'border border-gray-200/50 dark:border-gray-700/50 last:border-r-0',
        'transition-all duration-300 group',
        'hover:scale-[1.02] hover:z-10 hover:shadow-xl space-y-1',
        isCurrentMonth
          ? 'bg-white dark:bg-gray-900'
          : 'bg-gray-50/30 dark:bg-gray-800/20 text-gray-400 dark:text-gray-600',
        isTodayDate &&
          'ring-2 ring-blue-500 dark:ring-blue-400 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
        attendanceData && getStatusStyles(monthlyStatus),
        'hover:bg-linear-to-br hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20',
        isDateCellCurrentMonth && 'cursor-pointer',
      )}
    >
      <div
        className={cn(
          'text-sm font-semibold mb-1 relative flex items-center justify-between',
          isSaturday(day) && isCurrentMonth && 'text-blue-600 dark:text-blue-400',
          (isSunday(day) || holidayInfo) && isCurrentMonth && 'text-red-600 dark:text-red-400',
          isTodayDate && 'text-blue-700 dark:text-blue-300',
          !isCurrentMonth && 'text-gray-400 dark:text-gray-600',
          isCurrentMonth && !isWeekend && !isTodayDate && !holidayInfo && 'text-gray-900 dark:text-gray-100',
        )}
      >
        {day.getDate()}

        {holidayInfo && isCurrentMonth && (
          <Badge className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {holidayInfo.name}
          </Badge>
        )}
        {isTodayDate && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
        )}
      </div>

      {attendanceData && isCurrentMonth && (
        <CalendarDateCellContent attendanceData={attendanceData} monthlyStatus={monthlyStatus} />
      )}
    </div>
  );
};

export default CalendarDateCell;
