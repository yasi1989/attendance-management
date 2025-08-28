import { ArrowUpDown, Building, User, Mail, Shield, Settings } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { UpsertUserDialog } from './UpsertUserDialog';
import UserDeleteDialog from './DeleteUserDialog';
import { Company, Role } from '@/lib/actionTypes';
import { UserWithRelations } from '../type/fetchResultResponse';

type ColumnsDefProps = {
  allCompanies: Company[];
  allRoles: Role[];
};

export const columnsDef = ({ allCompanies, allRoles }: ColumnsDefProps) => {
  const columns: ColumnDef<UserWithRelations>[] = [
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
        const company = row.original.company;
        const companyName = company ? company.companyName : '未設定';
        return (
          <div className="font-semibold text-slate-900 dark:text-slate-100" title={companyName}>
            {companyName}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const companyA = rowA.original.company;
        const companyB = rowB.original.company;

        const nameA = companyA ? companyA.companyName : '未設定';
        const nameB = companyB ? companyB.companyName : '未設定';

        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '会社名',
      },
      filterFn: (row, _id, filterValue) => {
        const company = row.original.company;
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
        return (
          <div className="font-semibold text-slate-900 dark:text-slate-100" title={row.original.name}>
            {row.original.name}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const nameA = rowA.original.name;
        const nameB = rowB.original.name;
        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '名前',
      },
      filterFn: (row, _id, filterValue) => {
        return row.original.name.includes(filterValue);
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
        const role = row.original.role;
        const roleName = role ? role.roleName : '未設定';
        return (
          <div className="text-slate-900 dark:text-slate-100" title={roleName}>
            {roleName}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const roleA = rowA.original.role;
        const roleB = rowB.original.role;

        const nameA = roleA ? roleA.roleName : '未設定';
        const nameB = roleB ? roleB.roleName : '未設定';

        return nameA.localeCompare(nameB, 'ja', { numeric: true });
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '権限',
      },
      filterFn: (row, _id, filterValue) => {
        const role = row.original.role;
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
          <UpsertUserDialog user={row.original} allCompanies={allCompanies} allRoles={allRoles} />
          <UserDeleteDialog id={row.original.id} />
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
