import { Calendar } from 'lucide-react';
import StatusBadge from '@/components/layout/StatusBadge';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusType } from '@/types/statusType';
import AttendanceBulkDialog from '../dialog/components/AttendanceBulkDialog';
import { formatDisplayYearMonth } from '../lib/calendarUtils';
import CalendarNavigation from './CalendarNavigation';

type CalendarHeaderProps = {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  goToToday: () => void;
  monthlyStatus?: StatusType;
  canSubmit: boolean;
};

const CalendarHeader = ({
  currentDate,
  previousMonth,
  nextMonth,
  goToToday,
  monthlyStatus,
  canSubmit,
}: CalendarHeaderProps) => {
  return (
    <CardHeader className="border-b border-slate-200/30 dark:border-slate-700/30 bg-linear-to-r from-slate-50/90 to-blue-50/90 dark:from-slate-800/90 dark:to-indigo-900/90 backdrop-blur-sm px-4 pt-4 pb-3 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-9 h-9 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-lg shadow-sm shrink-0">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100 leading-none">
                {formatDisplayYearMonth(currentDate)}
              </CardTitle>
              <StatusBadge status={monthlyStatus} useIcon={true} className="inline-flex gap-1 px-2 py-1 text-xs" />
            </div>
            <CardDescription className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-snug hidden sm:block">
              日付をクリックして勤怠を入力・編集。月末に月次申請を行ってください。
            </CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <AttendanceBulkDialog currentDate={currentDate} canSubmit={canSubmit} />
          <CalendarNavigation previousMonth={previousMonth} nextMonth={nextMonth} goToToday={goToToday} />
        </div>
      </div>
    </CardHeader>
  );
};

export default CalendarHeader;
