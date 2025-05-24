'use client';

import { ArrowUpDown, Edit } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { UserType } from '../type/userType';
import { RoleType } from '../type/roleType';
import { DepartmentType } from '../type/departmentType';
import { CompanyCodeDialog } from '../../company/components/CompanyCodeDialog';
import CompanyCodeDeleteDialog from '../../company/components/CompanyCodeDeleteDialog';

// roles と departments をインポートしたデータから利用
export const userColumns: ColumnDef<UserType>[] = [
  {
    accessorKey: 'employeeCode',
    id: 'employeeCode',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          社員番号
          <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.employeeCode}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '社員番号',
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
    cell: ({ row }) => (
      <div className="font-medium">{row.original.lastName + row.original.firstName}</div>
    ),
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
    accessorKey: 'roleId',
    id: 'roleId',
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
    accessorKey: 'companyId',
    id: 'companyId',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          会社名
          <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.companyId ?? '未設定'}</div>,
    meta: {
      enableFilter: true,
      japaneseLabel: '会社名',
    },
  },
  {
    accessorKey: 'departmentId',
    id: 'departmentId',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          部署
          <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const department = departments.find((d: DepartmentType) => d.id === row.original.departmentId);
      return <div className="font-medium">{department ? department.departmentName : '未設定'}</div>;
    },
    meta: {
      enableFilter: true,
      japaneseLabel: '部署',
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
        <CompanyCodeDialog type="edit" data={row.original}>
          <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
        </CompanyCodeDialog>
        <CompanyCodeDeleteDialog />
      </div>
    ),
    meta: {
      enableFilter: false,
      japaneseLabel: '操作',
    },
  },
];