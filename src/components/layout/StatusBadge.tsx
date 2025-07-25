import { Badge } from '@/components/ui/badge';
import { cn } from '@/libs/utils';
import { StatusType } from '@/types/statusType';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const getStatusStyle = (status: StatusType) => {
  switch (status) {
    case 'Draft':
      return 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    case 'Submitted':
      return 'bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    case 'Approved':
      return 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
    case 'Rejected':
      return 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
    default:
      return 'bg-gray-50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800';
  }
};

export const getStatusName = (status: StatusType) => {
  switch (status) {
    case 'Draft':
      return '下書き';
    case 'Submitted':
      return '承認待ち';
    case 'Approved':
      return '承認済み';
    case 'Rejected':
      return '差し戻し';
    default:
      return '';
  }
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const style = getStatusStyle(status);

  return <Badge className={cn(style, className)}>{getStatusName(status)}</Badge>;
};

export default StatusBadge;
