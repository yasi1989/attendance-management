import { User, Calendar, MessageCircle, CheckCircle2 } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ApprovalStepType } from '@/features/approval/type/approvalStepType';
import { formatDateToISOString } from '@/lib/date';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<ApprovalStepType>[] = [
  {
    accessorKey: 'approver',
    id: 'approver',
    header: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
          <div className="flex items-center gap-1 md:gap-2">
            <User className="h-3 w-3 md:h-4 md:w-4" />
            <span>承認者</span>
          </div>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div
        className="font-semibold text-slate-900 dark:text-slate-100 truncate min-w-[80px]"
        title={`${row.original.approver.lastName} ${row.original.approver.firstName}`}
      >
        {`${row.original.approver.lastName} ${row.original.approver.firstName}`}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
          <div className="flex items-center gap-1 md:gap-2">
            <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4" />
            <span>状態</span>
          </div>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {statusBadge(row.original.status, row.original.statusName)}
      </div>
    ),
  },
  {
    accessorKey: 'approvedAt',
    id: 'approvedAt',
    header: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
          <div className="flex items-center gap-1 md:gap-2">
            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
            <span>日付</span>
          </div>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div
        className="text-slate-900 dark:text-slate-100 min-w-[70px] flex items-center justify-center"
        title={`${row.original.approvedAt}`}
      >
        <span className="block md:hidden">{formatDateToISOString(row.original.approvedAt, 'MM/dd')}</span>
        <span className="hidden md:block">{formatDateToISOString(row.original.approvedAt, 'yyyy-MM-dd')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'comment',
    id: 'comment',
    header: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
          <div className="flex items-center gap-1 md:gap-2">
            <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
            <span>コメント</span>
          </div>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div
        className="text-slate-900 dark:text-slate-100 min-w-[100px] md:min-w-[150px] truncate"
        title={`${row.original.comment || ''}`}
      >
        <span className="block md:hidden">
          {row.original.comment
            ? row.original.comment.length > 10
              ? `${row.original.comment.slice(0, 10)}...`
              : row.original.comment
            : '-'}
        </span>
        <span className="hidden md:block">{row.original.comment || '-'}</span>
      </div>
    ),
  },
];

const statusBadge = (status: string, statusName: string) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'amber';
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'slate';
    }
  };
  return (
    <Badge
      variant="outline"
      className={`bg-${getStatusColor(status)}-50 dark:bg-${getStatusColor(status)}-900/20 border-${getStatusColor(status)}-300 dark:border-${getStatusColor(status)}-800 text-${getStatusColor(status)}-700 dark:text-${getStatusColor(status)}-400`}
    >
      {statusName}
    </Badge>
  );
};
