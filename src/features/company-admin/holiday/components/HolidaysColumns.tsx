'use client';

import { ArrowUpDown, Edit } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { HolidayType } from '../type/holidayType';
import { UpsertHolidayDialog } from './UpsertHolidayDialog';
import { formatDateToISOString } from '@/lib/dateFormatter';
import DeleteHolidayDialog from './DeleteHolidayDialog';

export const holidaysColumns: ColumnDef<HolidayType>[] = [
  {
    accessorKey: 'code',
    id: 'code',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            休日コード
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.original.code}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '休日コード',
    },
  },
  {
    accessorKey: 'name',
    id: 'name',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            休日名
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '休日名',
    },
  },
  {
    accessorKey: 'holidayDate',
    id: 'holidayDate',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            休日日付
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{formatDateToISOString(row.original.holidayDate, 'yyyy-MM-dd')}</div>
    ),
    meta: {
      enableFilter: true,
      japaneseLabel: '休日日付',
    },
    filterFn: (row, id, value) => {
      const holidayDate = row.getValue(id) as Date;
      const formattedDate = formatDateToISOString(holidayDate, 'yyyy-MM-dd');
      return formattedDate.includes(value);
    },
  },
  {
    accessorKey: 'createdAt',
    id: 'createdAt',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            作成日
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="font-medium">{formatDateToISOString(row.original.createdAt, 'yyyy-MM-dd')}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '作成日',
    },
    filterFn: (row, id, value) => {
      const createdAt = row.getValue(id) as Date;
      const formattedDate = formatDateToISOString(createdAt, 'yyyy-MM-dd');
      return formattedDate.includes(value);
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
          <UpsertHolidayDialog type="edit" data={row.original}>
            <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
          </UpsertHolidayDialog>
          <DeleteHolidayDialog />
        </div>
      );
    },
    meta: {
      enableFilter: false,
      japaneseLabel: '操作',
    },
  },
];
