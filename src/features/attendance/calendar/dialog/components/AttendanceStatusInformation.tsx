import { Badge } from '@/components/ui/badge';
import { CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AlertCircle, Clock, Lock } from 'lucide-react';
import { HolidayType } from '@/features/admin/holidays/type/holidayType';
import { AttendanceData } from '../../types/attendance';

type AttendanceStatusInformationProps = {
  holidayInfo?: HolidayType;
  attendanceData?: AttendanceData;
  isWeekend: boolean;
  isDisabled: boolean;
};

const AttendanceStatusInformation = ({
  holidayInfo,
  isWeekend,
  isDisabled,
}: AttendanceStatusInformationProps) => {
  return (
    <div className="space-y-4">
      <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-base space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <Label className="text-base font-medium">勤務情報</Label>
        </div>
        {holidayInfo && (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 px-2 py-1 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
          >
            {holidayInfo.name}
          </Badge>
        )}
      </CardTitle>

      {isDisabled && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex items-start space-x-2">
            <Lock className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 pt-1" />
            <p className="text-xs text-yellow-800 dark:text-yellow-300">
              この勤怠データは申請済みまたは承認済みのため編集できません。
            </p>
          </div>
        </div>
      )}

      {(isWeekend || holidayInfo) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 dark:bg-red-900/20 dark:border-red-800">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 pt-1" />
            <p className="text-xs text-red-800 dark:text-red-300">
              通常は勤務日ではありません。特別な事情がある場合のみ申請してください。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceStatusInformation;
