import { Coffee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ATTENDANCES, LEAVES } from '@/consts/attendance';
import { STATUS } from '@/consts/status';
import { Attendance } from '@/lib/actionTypes';
import { calcOvertimeHours, calcWorkHours, isLeaveType } from '@/lib/attendance';
import { getStatusByValue } from '@/lib/status';
import { cn } from '@/lib/utils';
import { StatusType } from '@/types/statusType';

type CalendarDateCellContentProps = {
  attendanceData: Attendance;
  monthlyStatus?: StatusType;
};

const INDICATOR_COLORS: Record<StatusType, string> = {
  [STATUS.PENDING.value]: 'text-blue-700 dark:text-blue-400',
  [STATUS.SUBMITTED.value]: 'text-orange-700 dark:text-orange-400',
  [STATUS.REJECTED.value]: 'text-red-700 dark:text-red-400',
  [STATUS.APPROVED.value]: 'text-green-700 dark:text-green-400',
};

const getStatusIndicator = (status?: StatusType) => {
  const statusInfo = getStatusByValue(status);
  if (!statusInfo) return null;
  const Icon = statusInfo.icon;
  return <Icon className={cn('h-3 w-3', INDICATOR_COLORS[statusInfo.value])} />;
};

const isHalfDay = (attendanceData: Attendance): boolean =>
  attendanceData.attendanceType === ATTENDANCES.PAID.value && !!attendanceData.isHalfDay;

export const CalendarDateCellContent = ({ attendanceData, monthlyStatus }: CalendarDateCellContentProps) => {
  const workHours = calcWorkHours(attendanceData.startTime, attendanceData.endTime, attendanceData.breakTime);
  const overtimeHours =
    calcOvertimeHours(attendanceData.startTime, attendanceData.endTime, attendanceData.breakTime) ?? 0;
  const leaveLabel = Object.values(LEAVES).find((type) => type.value === attendanceData.attendanceType)?.label;
  const halfDay = isHalfDay(attendanceData);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        {getStatusIndicator(monthlyStatus)}
        {overtimeHours > 0 && (
          <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">残業</Badge>
        )}
      </div>

      {isLeaveType(attendanceData.attendanceType) && (
        <div className="flex items-center gap-1">
          <Coffee className="h-3 w-3 text-green-500" />
          <span className="text-xs text-green-600 dark:text-green-400 font-medium">{leaveLabel}</span>
        </div>
      )}

      {(!isLeaveType(attendanceData.attendanceType) || halfDay) && workHours !== undefined && (
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <div className="font-medium">{workHours}h</div>
          {overtimeHours > 0 && (
            <div className="text-orange-600 dark:text-orange-400 font-medium">+{overtimeHours}h</div>
          )}
        </div>
      )}
    </div>
  );
};
