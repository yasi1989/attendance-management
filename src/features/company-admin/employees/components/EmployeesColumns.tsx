'use client';

import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { UserType } from '@/features/system-admin/users/type/userType';

export const employeesColumns: ColumnDef<UserType>[] = [
  {
    accessorKey: 'lastName',
    id: 'lastName',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          名前
          <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="font-medium">{`${row.original.lastName} ${row.original.firstName}`}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '名前',
    },
    sortingFn: (row, _id, filterValue) => {
      const name = `${row.original.lastName}${row.original.firstName}`;
      return name.localeCompare(filterValue);
    },
    filterFn: (row, _id, filterValue) => {
      const name = `${row.original.lastName} ${row.original.firstName}`;
      return name.includes(filterValue);
    },
  },
  {
    accessorKey: 'email',
    id: 'email',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          メールアドレス
          <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="font-medium">{`${row.original.email}`}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: 'メールアドレス',
    },
  },
];
