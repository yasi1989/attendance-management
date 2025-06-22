import { User, Calendar, MessageCircle, CheckCircle2 } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ApprovalStepType } from '@/features/approval/type/approvalStepType';
import { formatDateToISOString } from '@/lib/dateFormatter';

export const columns: ColumnDef<ApprovalStepType>[] = [
  {
    accessorKey: 'approver',
    id: 'approver',
    header: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost">
          <User />
          承認者
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div
        className="font-semibold text-slate-900 dark:text-slate-100"
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
        <Button variant="ghost">
          <CheckCircle2 />
          状態
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-slate-900 dark:text-slate-100" title={`${row.original.status}`}>
        {`${row.original.statusName}`}
      </div>
    ),
  },
  {
    accessorKey: 'approvedAt',
    id: 'approvedAt',
    header: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost">
          <Calendar />
          更新日
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-slate-900 dark:text-slate-100" title={`${row.original.approvedAt}`}>
        {`${formatDateToISOString(row.original.approvedAt, 'yyyy-MM-dd')}`}
      </div>
    ),
  },
  {
    accessorKey: 'comment',
    id: 'comment',
    header: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost">
          <MessageCircle />
          コメント
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-slate-900 dark:text-slate-100" title={`${row.original.comment}`}>
        {`${row.original.comment || ''}`}
      </div>
    ),
  },
];
