import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Building, Mail, Settings, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Company } from '@/lib/actionTypes';
import UserDeleteDialog from '../components/DeleteUserDialog';
import { UserEditDialog } from '../components/UpsertUserDialog';
import { RoleType } from '../type/roleType';
import { UserType } from '../type/userType';

type ColumnsDefProps = {
  companies: Company[];
  roles: RoleType[];
};

export const createUsersColumns = ({ companies, roles }: ColumnsDefProps): ColumnDef<UserType>[] => {
  return [
    {
      accessorKey: 'companyName',
      id: 'companyName',
      header: ({ column }) => (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-1 md:gap-2">
              <Building className="h-3 w-3 md:h-4 md:w-4" />
              <span>会社名</span>
              <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const company = companies.find((c) => c.id === row.original.companyId);
        const companyName = company ? company.companyName : '未設定';
        return (
          <div className="font-semibold text-slate-900 dark:text-slate-100" title={companyName}>
            {companyName}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const companyA = companies.find((c) => c.id === rowA.original.companyId);
        const companyB = companies.find((c) => c.id === rowB.original.companyId);

        const nameA = companyA ? companyA.companyName : '未設定';
        const nameB = companyB ? companyB.companyName : '未設定';

        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '会社名',
      },
      filterFn: (row, _id, filterValue) => {
        const company = companies.find((c: Company) => c.id === row.original.companyId);
        return company ? company.companyName.includes(filterValue) : false;
      },
    },
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
      sortingFn: (rowA, rowB) => {
        return rowA.original.email.localeCompare(rowB.original.email, 'en', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: 'メールアドレス',
      },
      filterFn: (row, _id, filterValue) => {
        return row.original.email.includes(filterValue);
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
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
            <div className="flex items-center gap-1 md:gap-2">
              <Settings className="h-3 w-3 md:h-4 md:w-4" />
              <span>操作</span>
            </div>
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex space-x-1 items-center justify-center">
          <UserEditDialog user={row.original} companies={companies} roles={roles} />
          <UserDeleteDialog />
        </div>
      ),
      meta: {
        enableColumnFilter: false,
        japaneseLabel: '操作',
      },
    },
  ];
};
