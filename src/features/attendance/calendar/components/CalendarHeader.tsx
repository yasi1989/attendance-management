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
  const baseClasses =
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border backdrop-blur-sm shadow-sm transition-all duration-200';

  switch (status) {
    case 'None': {
      return (
        <div
          className={`${baseClasses} bg-gradient-to-r from-indigo-50/90 to-purple-50/90 text-indigo-700 border-indigo-200/50 dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-400 dark:border-indigo-700/50 hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/40 dark:hover:to-purple-900/40`}
        >
          <FileQuestion className="h-4 w-4" />
          未申請
        </div>
      );
    }
    case 'Draft': {
      return (
        <div
          className={`${baseClasses} bg-gradient-to-r from-blue-50/90 to-indigo-50/90 text-blue-700 border-blue-200/50 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400 dark:border-blue-700/50 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40`}
        >
          <FileText className="h-4 w-4" />
          下書き
        </div>
      );
    }
    case 'Submitted':
      return (
        <div
          className={`${baseClasses} bg-gradient-to-r from-amber-50/90 to-yellow-50/90 text-amber-700 border-amber-200/50 dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-300 dark:border-amber-800/50 hover:from-amber-50 hover:to-yellow-50 dark:hover:from-amber-900/40 dark:hover:to-yellow-900/40`}
        >
          <Clock className="h-4 w-4" />
          承認待ち
        </div>
      );
    case 'Approved':
      return (
        <div
          className={`${baseClasses} bg-gradient-to-r from-emerald-50/90 to-green-50/90 text-emerald-700 border-emerald-200/50 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-300 dark:border-emerald-800/50 hover:from-emerald-50 hover:to-green-50 dark:hover:from-emerald-900/40 dark:hover:to-green-900/40`}
        >
          <CheckCircle2 className="h-4 w-4" />
          承認済み
        </div>
      );
    case 'Rejected':
      return (
        <div
          className={`${baseClasses} bg-gradient-to-r from-red-50/90 to-rose-50/90 text-red-700 border-red-200/50 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300 dark:border-red-800/50 hover:from-red-50 hover:to-rose-50 dark:hover:from-red-900/40 dark:hover:to-rose-900/40`}
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
    <CardHeader className="border-b border-slate-200/30 dark:border-slate-700/30 bg-gradient-to-r from-slate-50/90 to-blue-50/90 dark:from-slate-800/90 dark:to-indigo-900/90 backdrop-blur-sm px-6 py-6 transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100 truncate">
              {formatMonth(currentDate)}
            </CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">申請状況:</span>
              {getStatusBadge(monthlyStatus)}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <AttendanceBulkDialog currentDate={currentDate} monthlyStatus={monthlyStatus} canSubmit={canSubmit} />
          <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 rounded-lg p-1 border border-slate-200/50 dark:border-slate-700/50 shadow-sm backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={previousMonth}
              className="h-8 w-8 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 dark:hover:from-slate-700/60 dark:hover:to-indigo-800/60 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToToday}
              className="h-8 px-3 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 dark:hover:from-slate-700/60 dark:hover:to-indigo-800/60 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-200"
            >
              今日
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextMonth}
              className="h-8 w-8 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 dark:hover:from-slate-700/60 dark:hover:to-indigo-800/60 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <CardDescription className="text-sm text-slate-600 dark:text-slate-400 mt-4">
        日付をクリックして勤怠データを入力・編集できます。月末に月次申請を行ってください。
      </CardDescription>
    </CardHeader>
  );
};

export default CalendarHeader;
