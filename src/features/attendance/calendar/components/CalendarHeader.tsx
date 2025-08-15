import { CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import AttendanceBulkDialog from '../dialog/components/AttendanceBulkDialog';
import { StatusType } from '@/types/statusType';
import StatusBadge from '@/components/layout/StatusBadge';
import CalendarNavigation from './CalendarNavigation';
import { formatDisplayYearMonth } from '../lib/calenderUtils';

type CalendarHeaderProps = {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  goToToday: () => void;
  monthlyStatus: StatusType;
  canSubmit: boolean;
}

const CalendarHeader = ({
  currentDate,
  previousMonth,
  nextMonth,
  goToToday,
  monthlyStatus,
  canSubmit,
}: CalendarHeaderProps) => {
  return (
    <CardHeader className="border-b border-slate-200/30 dark:border-slate-700/30 bg-gradient-to-r from-slate-50/90 to-blue-50/90 dark:from-slate-800/90 dark:to-indigo-900/90 backdrop-blur-sm px-6 py-6 transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100 truncate">
              {formatDisplayYearMonth(currentDate)}
            </CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">申請状況:</span>
              <StatusBadge status={monthlyStatus} useIcon={true} className="inline-flex gap-1.5 px-3 py-1.5 text-sm" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <AttendanceBulkDialog currentDate={currentDate} monthlyStatus={monthlyStatus} canSubmit={canSubmit} />
          <CalendarNavigation previousMonth={previousMonth} nextMonth={nextMonth} goToToday={goToToday} />
        </div>
      </div>
      <CardDescription className="text-sm text-slate-600 dark:text-slate-400 mt-4">
        日付をクリックして勤怠データを入力・編集できます。月末に月次申請を行ってください。
      </CardDescription>
    </CardHeader>
  );
};

export default CalendarHeader;
