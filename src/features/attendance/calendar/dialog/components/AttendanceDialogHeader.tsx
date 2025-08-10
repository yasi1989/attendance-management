import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star, X } from 'lucide-react';
import { formatDateToISOString } from '@/lib/date';
import { Button } from '@/components/ui/button';
import { HolidayType } from '@/features/admin/holidays/type/holidayType';

type AttendanceDialogHeaderProps = {
  day: Date;
  holidayInfo?: HolidayType;
  isWeekend: boolean;
  onClose: () => void;
};

const AttendanceDialogHeader = ({ day, holidayInfo, isWeekend, onClose }: AttendanceDialogHeaderProps) => {
  return (
    <DialogHeader className="px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3 flex-1">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              holidayInfo || isWeekend
                ? 'bg-gradient-to-br from-red-500 to-red-600'
                : 'bg-gradient-to-br from-blue-600 to-indigo-600'
            }`}
          >
            {holidayInfo || isWeekend ? (
              <Star className="w-5 h-5 text-white" />
            ) : (
              <Calendar className="w-5 h-5 text-white" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <DialogTitle className="text-lg sm:text-xl font-semibold">勤怠申請</DialogTitle>
              {holidayInfo && (
                <Badge
                  variant="outline"
                  className="text-xs bg-red-50 text-red-700 border-red-200 px-2 py-1 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                >
                  {holidayInfo.name}
                </Badge>
              )}
            </div>
            <DialogDescription className="text-sm sm:text-base">
              {formatDateToISOString(day)}の勤務情報を入力してください
            </DialogDescription>
          </div>
        </div>

        <Button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center transition-colors duration-200 ml-3"
          aria-label="ダイアログを閉じる"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </Button>
      </div>
    </DialogHeader>
  );
};

export default AttendanceDialogHeader;
