import { ColumnDef } from '@tanstack/react-table';
import { Calendar, CheckCircle2, MessageCircle, User } from 'lucide-react';
import StatusBadge from '@/components/layout/StatusBadge';
import { Button } from '@/components/ui/button';
import { formatDateForDisplay } from '@/lib/dateClient';
import { truncate } from '@/lib/utils';
import { ApprovalStepType } from '../type/approvalStepType';

export const approvalStepsColumns: ColumnDef<ApprovalStepType>[] = [
  {
    id: 'approverName',
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
      <div className="font-semibold text-slate-900 dark:text-slate-100 truncate min-w-[80px]">
        {row.original.approverName}
      </div>
    ),
  },
  {
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
        <StatusBadge status={row.original.statusCode} />
      </div>
    ),
  },
  {
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
      <div className="text-slate-900 dark:text-slate-100 min-w-[70px] flex items-center justify-center">
        <span className="block md:hidden">
          {row.original.approvedAt ? formatDateForDisplay(row.original.approvedAt, 'MM/dd') : '-'}
        </span>
        <span className="hidden md:block">
          {row.original.approvedAt ? formatDateForDisplay(row.original.approvedAt) : '-'}
        </span>
      </div>
    ),
  },
  {
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
        title={row.original.comment ?? ''}
      >
        <span className="block md:hidden">{truncate(row.original.comment ?? '', 10)}</span>
        <span className="hidden md:block">{row.original.comment ?? '-'}</span>
      </div>
    ),
  },
];
