'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Calendar, Gift, Settings } from 'lucide-react';
import HolidayTypeBadge from '@/components/layout/HolidayTypeBadge';
import { Button } from '@/components/ui/button';
import { FORM_MODE } from '@/consts/formMode';
import { HOLIDAY_CATEGORIES } from '@/consts/holiday';
import { Holiday } from '@/lib/actionTypes';
import { formatDateForDisplay } from '@/lib/dateClient';
import { getHolidayCategoryName } from '@/lib/holiday';
import DeleteHolidayDialog from '../components/DeleteHolidayDialog';
import { UpsertHolidayDialog } from '../components/UpsertHolidayDialog';

export const holidaysColumns: ColumnDef<Holiday>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-1 md:gap-2">
              <Gift className="h-3 w-3 md:h-4 md:w-4" />
              <span>祝日名</span>
              <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-semibold text-slate-900 dark:text-slate-100" title={row.original.name}>
        {row.original.name}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      return rowA.original.name.localeCompare(rowB.original.name, 'ja', { numeric: true });
    },
    meta: {
      enableColumnFilter: true,
      japaneseLabel: '祝日名',
    },
    filterFn: (row, _id, filterValue) => {
      return row.original.name.includes(filterValue);
    },
  },
  {
    accessorKey: 'holidayDate',
    id: 'holidayDate',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-1 md:gap-2">
              <Calendar className="h-3 w-3 md:h-4 md:w-4" />
              <span>日付</span>
              <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDateForDisplay(row.original.holidayDate);
      return (
        <div className="flex items-center justify-center text-slate-900 dark:text-slate-100" title={formattedDate}>
          {formattedDate}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.holidayDate);
      const dateB = new Date(rowB.original.holidayDate);
      return dateA.getTime() - dateB.getTime();
    },
    meta: {
      enableColumnFilter: true,
      japaneseLabel: '日付',
    },
    filterFn: (row, id, value) => {
      const holidayDate = row.getValue(id) as Date;
      const formattedDate = formatDateForDisplay(holidayDate);
      return formattedDate.includes(value);
    },
  },
  {
    accessorKey: 'type',
    id: 'type',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-1 md:gap-2">
              <Gift className="h-3 w-3 md:h-4 md:w-4" />
              <span>種別</span>
              <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">
        <HolidayTypeBadge holidayType={row.original.type} />
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      return rowA.original.type.localeCompare(rowB.original.type, 'ja', { numeric: true });
    },
    meta: {
      enableColumnFilter: true,
      japaneseLabel: '種別',
    },
    filterFn: (row, _id, filterValue) => {
      const typeName = getHolidayCategoryName(row.original.type);
      return typeName ? typeName.includes(filterValue) : false;
    },
  },
  {
    id: 'actions',
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
            <div className="flex items-center gap-1 md:gap-2">
              <Settings className="h-3 w-3 md:h-4 md:w-4" />
              <span>操作</span>
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) =>
      row.original.type === HOLIDAY_CATEGORIES.COMPANY.value && (
        <div className="flex space-x-1 items-center justify-center">
          <UpsertHolidayDialog type={FORM_MODE.EDIT.value} data={row.original} />
          <DeleteHolidayDialog id={row.original.id} />
        </div>
      ),
  },
];
