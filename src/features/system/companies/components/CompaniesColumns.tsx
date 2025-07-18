'use client';

import { ArrowUpDown, Building, Globe, Calendar, Settings } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { CompanyType } from '../type/companyType';
import { formatDateToISOString } from '@/lib/date';
import { UpsertCompanyDialog } from './UpsertCompanyDialog';
import DeleteCompanyDialog from './DeleteCompanyDialog';

export const companyColumns: ColumnDef<CompanyType>[] = [
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
              <Building className="h-3 w-3 md:h-4 md:w-4" />
              <span>会社名</span>
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
      japaneseLabel: '会社名',
    },
    filterFn: (row, _id, filterValue) => {
      return row.original.name.includes(filterValue);
    },
  },
  {
    accessorKey: 'domain',
    id: 'domain',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-1 md:gap-2">
              <Globe className="h-3 w-3 md:h-4 md:w-4" />
              <span>ドメイン</span>
              <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-slate-900 dark:text-slate-100" title={row.original.domain}>
        {row.original.domain}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      return rowA.original.domain.localeCompare(rowB.original.domain, 'en', { numeric: true });
    },
    meta: {
      enableColumnFilter: true,
      japaneseLabel: 'ドメイン',
    },
    filterFn: (row, _id, filterValue) => {
      return row.original.domain.includes(filterValue);
    },
  },
  {
    accessorKey: 'createdAt',
    id: 'createdAt',
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
              <span>作成日</span>
              <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDateToISOString(row.original.createdAt, 'yyyy-MM-dd');
      return (
        <div className="flex items-center justify-center text-slate-900 dark:text-slate-100" title={formattedDate}>
          {formattedDate}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.createdAt);
      const dateB = new Date(rowB.original.createdAt);
      return dateA.getTime() - dateB.getTime();
    },
    meta: {
      enableColumnFilter: true,
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
          <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
            <div className="flex items-center gap-1 md:gap-2">
              <Settings className="h-3 w-3 md:h-4 md:w-4" />
              <span>操作</span>
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1 items-center justify-center">
          <UpsertCompanyDialog type="edit" data={row.original} />
          <DeleteCompanyDialog />
        </div>
      );
    },
    meta: {
      enableColumnFilter: false,
      japaneseLabel: '操作',
    },
  },
];
