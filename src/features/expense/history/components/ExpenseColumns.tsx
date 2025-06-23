'use client';

import { ExpenseType } from '../type/expenseType';
import { ArrowUpDown, FileText, Edit } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { formatDateToISOString } from '@/lib/date';
import ExpenseDeleteDialog from './ExpenseDeleteDialog';

export const expenseColumns: ColumnDef<ExpenseType>[] = [
  {
    accessorKey: 'requestDate',
    id: 'requestDate',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            申請日
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{formatDateToISOString(row.original.requestDate, 'yyyy-MM-dd')}</div>
    ),
    meta: {
      japaneseLabel: '申請日',
      enableColumnFilter: true,
    },
    filterFn: (row, id, value) => {
      const requestDate = row.getValue(id) as Date;
      const formattedDate = formatDateToISOString(requestDate, 'yyyy-MM-dd');
      return formattedDate.includes(value);
    },
  },
  {
    accessorKey: 'expenseType',
    id: 'expenseType',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            経費
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const expenseType = row.original.expenseType;
      const color = expenseTypeBadgeColor[expenseType];
      return (
        <div className="flex items-center justify-center">
          <Badge className={`${color} px-2 py-1 text-xs font-medium rounded-full shadow-sm`}>{expenseType}</Badge>
        </div>
      );
    },
    meta: {
      japaneseLabel: '経費',
      enableColumnFilter: true,
    },
  },
  {
    accessorKey: 'amount',
    id: 'amount',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            金額
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="font-medium text-right">¥ {row.original.amount.toLocaleString()}</div>,
    meta: {
      japaneseLabel: '金額',
      enableColumnFilter: false,
    },
  },
  {
    accessorKey: 'statusId',
    id: 'statusId',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            状態
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.original.statusId;
      const color = statusBadgeColor[status];
      return (
        <div className="flex items-center justify-center">
          <Badge className={`${color} px-2 py-1 text-xs font-medium rounded-full shadow-sm`}>{status}</Badge>
        </div>
      );
    },
    meta: {
      japaneseLabel: '状態',
      enableColumnFilter: true,
    },
  },
  {
    accessorKey: 'description',
    id: 'description',
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost">説明</Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="max-w-xs text-sm text-slate-600">{truncateString(row.original.description, 20)}</div>
    ),
    meta: {
      japaneseLabel: '説明',
      enableColumnFilter: false,
    },
  },
  {
    accessorKey: 'receiptUrl',
    id: 'receiptUrl',
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost">領収証</Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.receiptUrl && row.original.receiptUrl !== '' && (
          <Link
            href={row.original.receiptUrl}
            target="_blank"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <FileText className="h-4 w-4 text-slate-600" />
          </Link>
        )}
      </div>
    ),
    meta: {
      japaneseLabel: '領収証',
      enableColumnFilter: false,
    },
  },
  {
    id: 'actions',
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost">操作</Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1">
          {row.original.statusId !== 'Approved' && (
            <>
              <Link
                href={`/expense/edit/${row.original.id}`}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <Edit className="h-4 w-4 text-blue-600" />
              </Link>
              <ExpenseDeleteDialog />
            </>
          )}
        </div>
      );
    },
    meta: {
      japaneseLabel: '操作',
      enableColumnFilter: false,
    },
  },
];

const statusBadgeColor: Record<string, string> = {
  Pending: 'bg-blue-100 text-blue-700 border border-blue-200',
  Approved: 'bg-green-100 text-green-700 border border-green-200',
  Rejected: 'bg-red-100 text-red-700 border border-red-200',
};

const expenseTypeBadgeColor: Record<string, string> = {
  Transport: 'bg-orange-100 text-orange-700 border border-orange-200',
  General: 'bg-purple-100 text-purple-700 border border-purple-200',
  Other: 'bg-slate-100 text-slate-700 border border-slate-200',
};

const truncateString = (str: string, maxLength: number): string => {
  return str.length <= maxLength ? str : str.substring(0, maxLength) + '...';
};