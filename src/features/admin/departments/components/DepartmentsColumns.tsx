'use client';

import { ArrowUpDown, Edit } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { UpsertDepartmentDialog } from './UpsertDepartmentDialog';
import DeleteDepartmentDialog from './DeleteDepartmentDialog';
import { UserType } from '@/features/system/users/type/userType';

export const columnsDef = (departments: DepartmentType[], users: UserType[]) => {
  const columns: ColumnDef<DepartmentType>[] = [
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
        enableColumnFilter: true,
        japaneseLabel: '部署名',
      },
    },
    {
      accessorKey: 'parentDepartmentName',
      id: 'parentDepartmentName',
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
              親部署
              <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const parentDepartment = departments.find((d) => d.id === row.original.parentDepartmentId);
        return <div className="font-medium">{parentDepartment ? parentDepartment.departmentName : '未設定'}</div>;
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '親部署',
      },
      filterFn: (row, _id, filterValue) => {
        const parentDepartment = departments.find((d) => d.id === row.original.parentDepartmentId);
        return parentDepartment ? parentDepartment.departmentName.includes(filterValue) : false;
      },
    },
    {
      accessorKey: 'managerUserName',
      id: 'managerUserName',
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
              部門責任者
              <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const managerUser = users.find((d) => d.id === row.original.managerUserId);
        return <div className="font-medium">{managerUser ? `${managerUser.firstName} ${managerUser.lastName}` : '未設定'}</div>;
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '管理者',
      },
      filterFn: (row, _id, filterValue) => {
        const managerUser = users.find((d) => d.id === row.original.managerUserId);
        return managerUser ? `${managerUser.firstName} ${managerUser.lastName}`.includes(filterValue) : false;
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
            <UpsertDepartmentDialog type="edit" userDepartment={row.original} allDepartments={departments} users={users}>
              <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                <Edit className="h-4 w-4 text-blue-600" />
              </Button>
            </UpsertDepartmentDialog>
            <DeleteDepartmentDialog />
          </div>
        );
      },
    },
  ];

  return columns;
};
