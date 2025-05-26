'use client';

import { ArrowUpDown, Edit } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { UserType } from '../type/userType';
import { RoleType } from '../type/roleType';
import { roles } from '../const/mockData';
import { companies } from '../../company/const/mockData';
import { CompanyType } from '../../company/type/companyType';
import { UserEditDialog } from './UserEditDialog';
import UserDeleteDialog from './UserDeleteDialog';

export const userColumns: ColumnDef<UserType>[] = [
  {
    accessorKey: 'id',
    id: 'id',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: 'ID',
    },
  },
  {
    accessorKey: 'name',
    id: 'name',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          氏名
          <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="font-medium">{`${row.original.lastName} ${row.original.firstName}`}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '氏名',
    },
    filterFn: (row, _id, filterValue) => {
      const lastName = row.getValue('lastName') as string;
      const firstName = row.getValue('firstName') as string;
      const name = lastName + firstName;
      return name.includes(filterValue);
    },
  },
  {
    accessorKey: 'roleName',
    id: 'roleName',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          権限
          <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const role = roles.find((r: RoleType) => r.id === row.original.roleId);
      return <div className="font-medium">{role ? role.roleName : '未設定'}</div>;
    },
    meta: {
      enableFilter: true,
      japaneseLabel: '権限',
    },
  },
  {
    accessorKey: 'companyName',
    id: 'companyName',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          会社名
          <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const company = companies.find((c: CompanyType) => c.id === row.original.companyId);
      company ? company.name : '未設定';
      return <div className="font-medium">{company ? company.name : '未設定'}</div>;
    },
    meta: {
      enableFilter: true,
      japaneseLabel: '会社名',
    },
  },
  {
    id: 'actions',
    header: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost">操作</Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <UserEditDialog user={row.original} companies={companies} roles={roles}>
          <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
        </UserEditDialog>
        <UserDeleteDialog />
      </div>
    ),
    meta: {
      enableFilter: false,
      japaneseLabel: '操作',
    },
  },
];
