import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { UserType } from '@/features/system/users/type/userType';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { RoleType } from '@/features/system/users/type/roleType';
import { Edit } from 'lucide-react';
import { getDepartmentPath } from '../lib/departmentUtils';
import { UpdateEmployeeDialog } from './UpdateEmployeeDialog';
import DeleteEmployeeDialog from './DeleteEmployeeDialog';

type EmployeesColumnsProps = {
  departments: DepartmentType[];
  roles: RoleType[];
};

export const columnsDef = ({ departments, roles }: EmployeesColumnsProps) => {
  const columns: ColumnDef<UserType>[] = [
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
        enableColumnFilter: true,
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
        enableColumnFilter: true,
        japaneseLabel: 'メールアドレス',
      },
    },
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
        enableColumnFilter: true,
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
        enableColumnFilter: true,
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
            <UpdateEmployeeDialog user={row.original} departments={departments} roles={roles}>
              <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                <Edit className="h-4 w-4 text-blue-600" />
              </Button>
            </UpdateEmployeeDialog>
            <DeleteEmployeeDialog />
          </div>
        );
      },
    },
  ];
  return columns;
};
