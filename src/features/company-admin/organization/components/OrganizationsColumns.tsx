'use client';

import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';

export const organizationsColumns: ColumnDef<DepartmentType>[] = [
  {
    accessorKey: 'departmentCode',
    id: 'departmentCode',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            部署コード
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.original.departmentCode}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '部署コード',
    },
  },
  {
    accessorKey: 'departmentName',
    id: 'departmentName',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            部署名
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.original.departmentName}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '部署名',
    },
  },
];
