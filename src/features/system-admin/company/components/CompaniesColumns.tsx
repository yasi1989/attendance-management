'use client';

import { ArrowUpDown, Edit } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { CompanyType } from '../type/companyType';
import { formatDateToISOString } from '@/lib/dateFormatter';
import { UpsertCompanyDialog } from './UpsertCompanyDialog';
import DeleteCompanyDialog from './DeleteCompanyDialog';

export const companyColumns: ColumnDef<CompanyType>[] = [
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
      enableColumnFilter: true,
      japaneseLabel: '会社名',
    },
  },
  {
    accessorKey: 'domain',
    id: 'domain',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            ドメイン
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.original.domain}</div>,
    meta: {
      enableColumnFilter: true,
      japaneseLabel: 'ドメイン',
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
    cell: ({ row }) => <div className="font-medium text-center">{formatDateToISOString(row.original.createdAt, 'yyyy-MM-dd')}</div>,
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
          <Button variant="ghost">操作</Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1 items-center justify-center">
          <UpsertCompanyDialog type="edit" data={row.original}>
            <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
          </UpsertCompanyDialog>
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
