import { ArrowUpDown, Settings, User, Mail, Building, Shield } from 'lucide-react';
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
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-1 md:gap-2">
              <User className="h-3 w-3 md:h-4 md:w-4" />
              <span>名前</span>
              <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const fullName = `${row.original.lastName} ${row.original.firstName}`;
        return (
          <div className="font-semibold text-slate-900 dark:text-slate-100" title={fullName}>
            {fullName}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const nameA = `${rowA.original.lastName} ${rowA.original.firstName}`;
        const nameB = `${rowB.original.lastName} ${rowB.original.firstName}`;
        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '名前',
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
        const departmentPath = getDepartmentPath(departments, row.original.departmentId);
        return (
          <div className="text-slate-900 dark:text-slate-100" title={departmentPath}>
            {departmentPath}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const departmentA = departments.find((d: DepartmentType) => d.id === rowA.original.departmentId);
        const departmentB = departments.find((d: DepartmentType) => d.id === rowB.original.departmentId);

        const nameA = departmentA ? departmentA.departmentName : '未設定';
        const nameB = departmentB ? departmentB.departmentName : '未設定';

        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '部署名',
      },
      filterFn: (row, _id, filterValue) => {
        const department = departments.find((d: DepartmentType) => d.id === row.original.departmentId);
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
        const role = roles.find((r: RoleType) => r.id === row.original.roleId);
        const roleName = role ? role.roleName : '未設定';
        return (
          <div className="text-slate-900 dark:text-slate-100" title={roleName}>
            {roleName}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const roleA = roles.find((r: RoleType) => r.id === rowA.original.roleId);
        const roleB = roles.find((r: RoleType) => r.id === rowB.original.roleId);

        const nameA = roleA ? roleA.roleName : '未設定';
        const nameB = roleB ? roleB.roleName : '未設定';

        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '権限',
      },
      filterFn: (row, _id, filterValue) => {
        const role = roles.find((r: RoleType) => r.id === row.original.roleId);
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
            <UpdateEmployeeDialog user={row.original} departments={departments} roles={roles}>
              <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                <Edit className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
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
