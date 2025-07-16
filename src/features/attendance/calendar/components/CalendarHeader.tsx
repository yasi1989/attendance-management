import { CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileQuestion,
  FileText,
} from 'lucide-react';
import { MONTHS_JP } from '../const/calendarConst';
import { MonthlySubmissionStatus } from '../types/attendance';
import AttendanceBulkDialog from '../dialog/components/AttendanceBulkDialog';

interface CalendarHeaderProps {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  goToToday: () => void;
  monthlyStatus: MonthlySubmissionStatus;
  canSubmit: boolean;
}

export const formatMonth = (date: Date) => {
  return `${date.getFullYear()}年 ${MONTHS_JP[date.getMonth()]}`;
};

const getStatusBadge = (status: MonthlySubmissionStatus) => {
  const baseClasses = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border';

  switch (status) {
    case 'None': {
      return (
        <div
          className={`${baseClasses} bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-800/20 dark:text-indigo-400 dark:border-indigo-700`}
        >
          <FileQuestion className="h-4 w-4" />
          未申請
        </div>
      );
    }
    case 'Draft': {
      return (
        <div
          className={`${baseClasses} bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-800/20 dark:text-blue-400 dark:border-blue-700`}
        >
          <FileText className="h-4 w-4" />
          下書き
        </div>
      );
    }
    case 'Submitted':
      return (
        <div
          className={`${baseClasses} bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800`}
        >
          <Clock className="h-4 w-4" />
          承認待ち
        </div>
      );
    case 'Approved':
      return (
        <div
          className={`${baseClasses} bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800`}
        >
          <CheckCircle2 className="h-4 w-4" />
          承認済み
        </div>
      );
    case 'Rejected':
      return (
        <div
          className={`${baseClasses} bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800`}
        >
          <AlertCircle className="h-4 w-4" />
          差し戻し
        </div>
      );
  }
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
    <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-6 py-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg shadow-sm">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100 truncate">
              {formatMonth(currentDate)}
            </CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">申請状況:</span>
              {getStatusBadge(monthlyStatus)}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <AttendanceBulkDialog currentDate={currentDate} monthlyStatus={monthlyStatus} canSubmit={canSubmit} />
          <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              onClick={previousMonth}
              className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToToday}
              className="h-8 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium"
            >
              今日
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextMonth}
              className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        日付をクリックして勤怠データを入力・編集できます。月末に月次申請を行ってください。
      </CardDescription>
    </CardHeader>
  );
};

export default CalendarHeader;
