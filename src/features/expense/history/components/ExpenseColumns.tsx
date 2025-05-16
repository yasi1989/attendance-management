'use client';

import { ExpenseType } from '../type/expenseType';
import { ArrowUpDown, FileText, Edit, Trash2 } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { formatDateToISOString } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { truncateString } from '@/lib/utils';
import Link from 'next/link';

export const expenseColumns: ColumnDef<ExpenseType>[] = [
  {
    accessorKey: 'request_date',
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
    cell: ({ row }) => <div className="font-medium">{formatDateToISOString(row.original.request_date)}</div>,
  },
  {
    accessorKey: 'expenseType',
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
      const expenseTypeInfo = expenseTypeToJapanese[expenseType];
      return (
        <div className="flex items-center justify-center">
          <Badge className={`${expenseTypeInfo.className} px-2 py-1 text-xs font-medium rounded-full shadow-sm`}>
            {expenseTypeInfo.label}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
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
  },
  {
    accessorKey: 'status_id',
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
      const status = row.original.status_id;
      const statusInfo = statusToJapanese[status];
      return (
        <div className="flex items-center justify-center">
          <Badge className={`${statusInfo.className} px-2 py-1 text-xs font-medium rounded-full shadow-sm`}>
            {statusInfo.label}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'description',
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
          <Link
            href={row.original.receipt_url}
            target="_blank"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <FileText className="h-4 w-4 text-slate-600" />
          </Link>
          {row.original.status_id !== 'Approved' && (
            <>
              <Link
                href={`/expense/edit/${row.original.id}`}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <Edit className="h-4 w-4 text-blue-600" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];

const statusToJapanese: Record<string, { label: string; className: string }> = {
  Pending: {
    label: '申請中',
    className: 'bg-blue-100 text-blue-700 border border-blue-200',
  },
  Approved: {
    label: '承認済み',
    className: 'bg-green-100 text-green-700 border border-green-200',
  },
  Rejected: {
    label: '却下',
    className: 'bg-red-100 text-red-700 border border-red-200',
  },
};

const expenseTypeToJapanese: Record<string, { label: string; className: string }> = {
  Transport: {
    label: '交通費',
    className: 'bg-orange-100 text-orange-700 border border-orange-200',
  },
  General: {
    label: '一般経費',
    className: 'bg-purple-100 text-purple-700 border border-purple-200',
  },
  Other: {
    label: 'その他',
    className: 'bg-slate-100 text-slate-700 border border-slate-200',
  },
};
