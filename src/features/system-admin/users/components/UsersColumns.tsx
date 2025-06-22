import { ArrowUpDown, Edit } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { UserType } from '../type/userType';
import { RoleType } from '../type/roleType';
import { CompanyType } from '../../company/type/companyType';
import { UserEditDialog } from './UpsertUserDialog';
import UserDeleteDialog from './DeleteUserDialog';

type ColumnsDefProps = {
  companies: CompanyType[];
  roles: RoleType[];
};

export const columnsDef = ({ companies, roles }: ColumnsDefProps) => {
  const columns: ColumnDef<UserType>[] = [
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
        enableColumnFilter: true,
        japaneseLabel: '会社名',
      },
      filterFn: (row, _id, filterValue) => {
        const company = companies.find((c: CompanyType) => c.id === row.original.companyId);
        return company ? company.name.includes(filterValue) : false;
      },
      sortingFn: (row, _id, filterValue) => {
        const company = companies.find((c: CompanyType) => c.id === row.original.companyId);
        return company ? company.name.localeCompare(filterValue) : 0;
      },
    },
    {
      accessorKey: 'name',
      id: 'name',
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
      cell: ({ row }) => <div className="font-medium">{row.original.email}</div>,
      meta: {
        enableColumnFilter: true,
        japaneseLabel: 'メールアドレス',
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
        return <div className="font-medium">{`${role ? role.roleName : '未設定'}`}</div>;
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
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost">操作</Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex space-x-1 items-center justify-center">
          <UserEditDialog user={row.original} companies={companies} roles={roles}>
            <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
          </UserEditDialog>
          <UserDeleteDialog />
        </div>
      ),
      meta: {
        enableColumnFilter: false,
        japaneseLabel: '操作',
      },
    },
  ];
  return columns;
};
