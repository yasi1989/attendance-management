'use client';

import { ArrowUpDown, Edit } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import CompanyCodeDeleteDialog from './CompanyCodeDeleteDialog';
import { CompanyType } from '../type/companyType';
import { CompanyCodeDialog } from './CompanyCodeDialog';
import { formatDateToISOString } from '@/lib/dateFormatter';

export const companyCodeColumns: ColumnDef<CompanyType>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            会社名
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '会社名',
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
          <CompanyCodeDialog type="edit" data={row.original}>
            <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
          </CompanyCodeDialog>
          <CompanyCodeDeleteDialog />
        </div>
      );
    },
    meta: {
      enableFilter: false,
      japaneseLabel: '操作',
    },
  },
];
