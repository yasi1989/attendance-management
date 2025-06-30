'use client';

import { ArrowUpDown, Building, Building2, Edit, Settings, User } from 'lucide-react';
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
            <Button
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <Building className="h-3 w-3 md:h-4 md:w-4" />
                <span>部署名</span>
                <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
              </div>
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-slate-900 dark:text-slate-100 font-semibold" title={`${row.original.departmentName}`}>
          {`${row.original.departmentName}`}
        </div>
      ),
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
            <Button
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <Building2 className="h-3 w-3 md:h-4 md:w-4" />
                <span>親部署</span>
                <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
              </div>
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const parentDepartment = departments.find((d) => d.id === row.original.parentDepartmentId);
        const parentDepartmentName = parentDepartment ? parentDepartment.departmentName : '未設定';
        return (
          <div className="text-slate-900 dark:text-slate-100" title={`${parentDepartmentName}`}>
            {parentDepartmentName}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const parentDepartmentA = departments.find((d) => d.id === rowA.original.parentDepartmentId);
        const parentDepartmentB = departments.find((d) => d.id === rowB.original.parentDepartmentId);

        const nameA = parentDepartmentA ? parentDepartmentA.departmentName : '未設定';
        const nameB = parentDepartmentB ? parentDepartmentB.departmentName : '未設定';

        return nameA.localeCompare(nameB, 'ja', { numeric: true });
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
            <Button
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <User className="h-3 w-3 md:h-4 md:w-4" />
                <span>部門責任者</span>
                <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
              </div>
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const managerUser = users.find((d) => d.id === row.original.managerUserId);
        const managerUserName = managerUser ? `${managerUser.firstName} ${managerUser.lastName}` : '未設定';
        return (
          <div className="text-slate-900 dark:text-slate-100" title={`${managerUserName}`}>
            {managerUserName}
          </div>
        );
      },

      sortingFn: (rowA, rowB) => {
        const managerUserA = users.find((d) => d.id === rowA.original.managerUserId);
        const managerUserB = users.find((d) => d.id === rowB.original.managerUserId);

        const nameA = managerUserA ? `${managerUserA.firstName} ${managerUserA.lastName}` : '未設定';
        const nameB = managerUserB ? `${managerUserB.firstName} ${managerUserB.lastName}` : '未設定';

        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '部門責任者',
      },
      filterFn: (row, _id, filterValue) => {
        const managerUser = users.find((d) => d.id === row.original.managerUserId);
        const managerUserName = managerUser ? `${managerUser.firstName} ${managerUser.lastName}` : '未設定';
        return managerUserName.includes(filterValue);
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
            <UpsertDepartmentDialog
              type="edit"
              userDepartment={row.original}
              allDepartments={departments}
              users={users}
            >
              <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                <Edit className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
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
