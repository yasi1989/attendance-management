'use client';

import { DataTable } from '@/components/DataTable';
import { employeesColumns } from './EmployeesColumns';
import { UserType } from '@/features/system-admin/users/type/userType';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit } from 'lucide-react';
import DeleteEmployeeDialog from './DeleteEmployeeDialog';
import { UpsertEmployeeDialog } from './UpdateEmployeeDialog';
import { RoleType } from '@/features/system-admin/users/type/roleType';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { getDepartmentPath } from '../lib/departmentUtils';

type EmployeesListTableProps = {
  users: UserType[];
  departments: DepartmentType[];
  roles: RoleType[];
};

const EmployeesListTable = ({ users, departments, roles }: EmployeesListTableProps) => {
  const employeeColumn: ColumnDef<UserType>[] = [
    {
      accessorKey: 'departmentName',
      id: 'departmentName',
      header: ({ column }) => (
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            部署名
            <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        return <div className="font-medium">{getDepartmentPath(departments, row.original.departmentId)}</div>;
      },
      meta: {
        enableFilter: true,
        japaneseLabel: '部署名',
      },
      filterFn: (row, _id, filterValue) => {
        const department = departments.find((d: DepartmentType) => d.id === row.original.departmentId);
        return department ? department.departmentName.includes(filterValue) : false;
      },
      sortingFn: (row, _id, filterValue) => {
        const department = departments.find((d: DepartmentType) => d.id === row.original.departmentId);
        return department ? department.departmentName.localeCompare(filterValue) : 0;
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
      filterFn: (row, _id, filterValue) => {
        const role = roles.find((r: RoleType) => r.id === row.original.roleId);
        return role ? role.roleName.includes(filterValue) : false;
      },
      sortingFn: (row, _id, filterValue) => {
        const role = roles.find((r: RoleType) => r.id === row.original.roleId);
        return role ? role.roleName.localeCompare(filterValue) : 0;
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
            <UpsertEmployeeDialog type="edit" user={row.original} departments={departments} roles={roles}>
              <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                <Edit className="h-4 w-4 text-blue-600" />
              </Button>
            </UpsertEmployeeDialog>
            <DeleteEmployeeDialog />
          </div>
        );
      },
      meta: {
        enableFilter: false,
        japaneseLabel: '操作',
      },
    },
  ];
  const columns = [...employeesColumns, ...employeeColumn];
  return <DataTable columns={columns} data={users} />;
};

export default EmployeesListTable;
