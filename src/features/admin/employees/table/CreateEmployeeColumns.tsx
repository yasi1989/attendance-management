import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Building, Mail, Settings, Shield, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SELECT_EMPTY } from '@/consts/form';
import { Department, Role, User } from '@/lib/actionTypes';
import DeleteEmployeeDialog from '../components/DeleteEmployeeDialog';
import { UpdateEmployeeDialog } from '../components/UpdateEmployeeDialog';
import { getDepartmentPath } from '../lib/departmentUtils';

type EmployeesColumnsProps = {
  departments: Department[];
  roles: Role[];
};

export const createEmployeeColumns = ({ departments, roles }: EmployeesColumnsProps): ColumnDef<User>[] => {
  return [
    {
      accessorKey: 'name',
      id: 'name',
      header: ({ column }) => (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-1 md:gap-2">
              <UserIcon className="h-3 w-3 md:h-4 md:w-4" />
              <span>名前</span>
              <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const fullName = `${row.original.name}`;
        return (
          <div className="font-semibold text-slate-900 dark:text-slate-100" title={fullName}>
            {fullName}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const nameA = `${rowA.original.name}`;
        const nameB = `${rowB.original.name}`;
        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '名前',
      },
      filterFn: (row, _id, filterValue) => {
        const name = `${row.original.name}`;
        return name.includes(filterValue);
      },
    },
    {
      accessorKey: 'email',
      id: 'email',
      header: ({ column }) => (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-1 md:gap-2">
              <Mail className="h-3 w-3 md:h-4 md:w-4" />
              <span>メールアドレス</span>
              <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-slate-900 dark:text-slate-100" title={row.original.email}>
          {row.original.email}
        </div>
      ),
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
      ),
      cell: ({ row }) => {
        const departmentPath = getDepartmentPath(departments, row.original.departmentId ?? undefined);
        return (
          <div className="text-slate-900 dark:text-slate-100" title={departmentPath}>
            {departmentPath}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const departmentA = departments.find((d: Department) => d.id === rowA.original.departmentId);
        const departmentB = departments.find((d: Department) => d.id === rowB.original.departmentId);

        const nameA = departmentA ? departmentA.departmentName : SELECT_EMPTY.label;
        const nameB = departmentB ? departmentB.departmentName : SELECT_EMPTY.label;

        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '部署名',
      },
      filterFn: (row, _id, filterValue) => {
        const department = departments.find((d: Department) => d.id === row.original.departmentId);
        return department ? department.departmentName.includes(filterValue) : false;
      },
    },
    {
      accessorKey: 'roleName',
      id: 'roleName',
      header: ({ column }) => (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-1 md:gap-2">
              <Shield className="h-3 w-3 md:h-4 md:w-4" />
              <span>権限</span>
              <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const role = roles.find((r: Role) => r.id === row.original.roleId);
        const roleName = role ? role.roleName : SELECT_EMPTY.label;
        return (
          <div className="text-slate-900 dark:text-slate-100" title={roleName}>
            {roleName}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const roleA = roles.find((r: Role) => r.id === rowA.original.roleId);
        const roleB = roles.find((r: Role) => r.id === rowB.original.roleId);

        const nameA = roleA ? roleA.roleName : SELECT_EMPTY.label;
        const nameB = roleB ? roleB.roleName : SELECT_EMPTY.label;

        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '権限',
      },
      filterFn: (row, _id, filterValue) => {
        const role = roles.find((r: Role) => r.id === row.original.roleId);
        return role ? role.roleName.includes(filterValue) : false;
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
            <UpdateEmployeeDialog user={row.original} departments={departments} roles={roles} />
            <DeleteEmployeeDialog id={row.original.id} />
          </div>
        );
      },
    },
  ];
};
