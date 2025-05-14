'use client';

import { ExpenseType } from '../type/expenseType';
import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { formatDateToISOString } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { truncateString } from '@/lib/utils';

export const expenseColumns: ColumnDef<ExpenseType>[] = [
  {
    accessorKey: 'request_date',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          申請日
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => formatDateToISOString(row.original.request_date),
  },
  {
    accessorKey: 'expenseType',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          経費種別
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => row.original.expenseType,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          金額
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => `¥ ${row.original.amount.toLocaleString()}`,
  },
  {
    accessorKey: 'status_id',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          状態
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status_id;
      const statusInfo = statusToJapanese[status];
      return <Badge className={`${statusInfo.className} px-2 py-1 rounded-md`}>{statusInfo.label}</Badge>;
    },
  },
  {
    accessorKey: 'description',
    header: '説明',
    cell: ({ row }) => truncateString(row.original.description, 12),
  },
  {
    accessorKey: 'receipt_url',
    header: '領収書',
    cell: ({ row }) => {
      return (
        <Link href={row.original.receipt_url} target="_blank" className="text-blue-500 hover:underline">
          表示
        </Link>
      );
    },
  },
  {
    id: 'actions',
    header: '操作',
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            詳細
          </Button>
          <Button variant="destructive" size="sm">
            削除
          </Button>
        </div>
      );
    },
  },
];

const statusToJapanese: Record<string, { label: string; className: string }> = {
  Pending: {
    label: '申請中',
    className: 'bg-blue-100 text-blue-800',
  },
  Approved: {
    label: '承認済み',
    className: 'bg-green-100 text-green-800',
  },
  Rejected: {
    label: '却下',
    className: 'bg-red-100 text-red-800',
  },
};
