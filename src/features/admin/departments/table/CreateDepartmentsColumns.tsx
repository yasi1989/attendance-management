'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Building, Building2, Settings, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SELECT_EMPTY } from '@/consts/form';
import { FORM_MODE } from '@/consts/formMode';
import { Department, PublicUser } from '@/lib/actionTypes';
import DeleteDepartmentDialog from '../components/DeleteDepartmentDialog';
import { UpsertDepartmentDialog } from '../components/UpsertDepartmentDialog';

export const createDepartmentsColumns = (departments: Department[], users: PublicUser[]): ColumnDef<Department>[] => {
  return [
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
        const parentDepartmentName = parentDepartment ? parentDepartment.departmentName : SELECT_EMPTY.label;
        return (
          <div className="text-slate-900 dark:text-slate-100" title={`${parentDepartmentName}`}>
            {parentDepartmentName}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const parentDepartmentA = departments.find((d) => d.id === rowA.original.parentDepartmentId);
        const parentDepartmentB = departments.find((d) => d.id === rowB.original.parentDepartmentId);

        const nameA = parentDepartmentA ? parentDepartmentA.departmentName : SELECT_EMPTY.label;
        const nameB = parentDepartmentB ? parentDepartmentB.departmentName : SELECT_EMPTY.label;

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
                <UserIcon className="h-3 w-3 md:h-4 md:w-4" />
                <span>部門責任者</span>
                <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
              </div>
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const managerUser = users.find((d) => d.id === row.original.managerUserId);
        const managerUserName = managerUser ? `${managerUser.name}` : SELECT_EMPTY.label;
        return (
          <div className="text-slate-900 dark:text-slate-100" title={`${managerUserName}`}>
            {managerUserName}
          </div>
        );
      },

      sortingFn: (rowA, rowB) => {
        const managerUserA = users.find((d) => d.id === rowA.original.managerUserId);
        const managerUserB = users.find((d) => d.id === rowB.original.managerUserId);

        const nameA = managerUserA ? managerUserA.name : SELECT_EMPTY.label;
        const nameB = managerUserB ? managerUserB.name : SELECT_EMPTY.label;

        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '部門責任者',
      },
      filterFn: (row, _id, filterValue) => {
        const managerUser = users.find((d) => d.id === row.original.managerUserId);
        const managerUserName = managerUser ? managerUser.name : SELECT_EMPTY.label;
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
              type={FORM_MODE.EDIT.value}
              userDepartment={row.original}
              allDepartments={departments}
              users={users}
            />
            <DeleteDepartmentDialog id={row.original.id} />
          </div>
        );
      },
    },
  ];
};
