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
import { Badge } from '@/components/ui/badge';

export const userColumns: ColumnDef<UserType>[] = [
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
      return <div className="font-medium">{company ? company.name : '未設定'}</div>;
    },
    meta: {
      enableFilter: true,
      japaneseLabel: '会社名',
    },
    filterFn: (row, _id, filterValue) => {
      const company = companies.find((c: CompanyType) => c.id === row.original.companyId);
      return company ? company.name.includes(filterValue) : false;
    },
  },
  {
    accessorKey: 'lastName',
    id: 'lastName',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          姓
          <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="font-medium">{`${row.original.lastName}`}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '姓',
    },
  },
  {
    accessorKey: 'firstName',
    id: 'firstName',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          名
          <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="font-medium">{`${row.original.firstName}`}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '名',
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
      const color = role ? roleBadgeColor[role.roleCode] : '';
      return (
        <div className="flex items-center justify-center">
          <Badge className={`${color} px-2 py-1 text-xs font-medium rounded-full shadow-sm`}>{role?.roleName}</Badge>
        </div>
      );
    },
    meta: {
      enableFilter: true,
      japaneseLabel: '権限',
    },
    filterFn: (row, _id, filterValue) => {
      const role = roles.find((r: RoleType) => r.id === row.original.roleId);
      return role ? role.roleName.includes(filterValue) : false;
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

const roleBadgeColor: Record<string, string> = {
  SYSTEM_ADMIN: 'bg-blue-100 text-blue-700 border border-blue-200',
  EXECUTIVE: 'bg-green-100 text-green-700 border border-green-200',
  HR_ADMIN: 'bg-red-100 text-red-700 border border-red-200',
  DEPARTMENT_HEAD: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  SECTION_MANAGER: 'bg-pink-100 text-pink-700 border border-pink-200',
  TEAM_LEADER: 'bg-orange-100 text-orange-700 border border-orange-200',
  EMPLOYEE: 'bg-purple-100 text-purple-700 border border-purple-200',
  INDIVIDUAL: 'bg-slate-100 text-slate-700 border border-slate-200',
};
