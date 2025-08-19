import { Badge } from '@/components/ui/badge';
import { StatusType } from '@/types/statusType';
import { getStatusByValue } from '@/lib/status';
import { STATUS } from '@/consts/status';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  useIcon?: boolean;
}

const STATUS_COLORS: Record<StatusType, string> = {
  [STATUS.PENDING.value]: 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  [STATUS.SUBMITTED.value]: 'bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  [STATUS.REJECTED.value]: 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  [STATUS.APPROVED.value]: 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
};

const getStatusStyle = (status: StatusType, className?: string, useIcon?: boolean) => {
  const statusInfo = getStatusByValue(status);
  if (!statusInfo) return '';
  const label = statusInfo?.label;
  const Icon = statusInfo?.icon;
  const colorClasses = STATUS_COLORS[statusInfo.value];
  return (
    <Badge className={`${className} ${colorClasses}`}>
      {useIcon && Icon && <Icon />}
      {label}
    </Badge>
  );
};

const StatusBadge = ({ status, className, useIcon = false }: StatusBadgeProps) => {
  return getStatusStyle(status, className, useIcon);
};

export default StatusBadge;
