import { User, Building2, Clock, Timer, Settings, List, Check } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getDepartmentPath } from '@/features/admin/employees/lib/departmentUtils';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { formatCurrency } from '@/lib/currency';
import { ExpenseDetailDialog } from './dialogs/ExpenseDetailDialog';
import { Badge } from '@/components/ui/badge';
import { MonthlyExpenseApprovalItem } from '../type/monthlyExpenseApprovalType';
import ApprovalStatusBadge from './ApprovalStatusBadge';

type ExpenseApprovalsColumnsProps = {
  departments: DepartmentType[];
};

export const columnsDef = ({ departments }: ExpenseApprovalsColumnsProps) => {
  const columns: ColumnDef<MonthlyExpenseApprovalItem>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
        </div>
      ),
      cell: ({ row }) => {
        const status = row.original.statusCode;
        return (
          <div className="flex items-center justify-center">
            <Checkbox
              disabled={status !== 'Submitted'}
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
              className="border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      id: 'name',
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <User />
            従業員
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div
          className="font-semibold text-slate-900 dark:text-slate-100"
          title={`${row.original.user.lastName} ${row.original.user.firstName}`}
        >
          {`${row.original.user.lastName} ${row.original.user.firstName}`}
        </div>
      ),
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '従業員',
      },
      filterFn: (row, _id, filterValue) => {
        const name = `${row.original.user.lastName} ${row.original.user.firstName}`;
        return name.includes(filterValue);
      },
    },
    {
      accessorKey: 'status',
      id: 'status',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost">
              <Check />
              状態
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <ApprovalStatusBadge status={row.original.statusCode} />
        </div>
      ),
    },
    {
      accessorKey: 'departmentName',
      id: 'departmentName',
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <Building2 />
            所属
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const departmentPath = getDepartmentPath(departments, row.original.user.departmentId);
        const pathParts = departmentPath.split(' > ');

        return (
          <div className="w-40">
            {pathParts.length > 1 ? (
              <div className="space-y-0.5">
                <div className="text-slate-900 dark:text-slate-100 truncate" title={departmentPath}>
                  {pathParts[pathParts.length - 1]}
                </div>
                <div className="text-slate-500 dark:text-slate-400 truncate" title={departmentPath}>
                  {pathParts.slice(0, -1).join(' > ')}
                </div>
              </div>
            ) : (
              <div className="text-slate-900 dark:text-slate-100 truncate" title={departmentPath}>
                {departmentPath}
              </div>
            )}
          </div>
        );
      },
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '所属',
      },
      filterFn: (row, _id, filterValue) => {
        const department = departments.find((d: DepartmentType) => d.id === row.original.user.departmentId);
        const departmentPath = getDepartmentPath(departments, row.original.user.departmentId);
        return department
          ? department.departmentName.includes(filterValue) || departmentPath.includes(filterValue)
          : false;
      },
    },
    {
      accessorKey: 'totalAmount',
      id: 'totalAmount',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost">
              <Clock />
              申請金額
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-slate-900 dark:text-slate-100">{formatCurrency(row.original.totalAmount)}</div>
        </div>
      ),
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '申請金額',
      },
    },
    {
      accessorKey: 'itemCount',
      id: 'itemCount',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost">
              <Timer />
              件数
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-slate-900 dark:text-slate-100">{row.original.itemCount}</div>
        </div>
      ),
    },
    {
      accessorKey: 'categoryBreakdown',
      id: 'categoryBreakdown',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost">
              <List />
              内訳
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <div className="flex flex-wrap gap-1">
            {Object.entries(row.original.categoryBreakdown).map(
              ([category, item]) =>
                item.count > 0 && (
                  <Badge key={category} variant="outline" className="text-xs">
                    {item.name}
                    {item.count}
                  </Badge>
                ),
            )}
          </div>
        </div>
      ),
    },
    {
      id: 'actions',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost">
              <Settings />
              操作
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <ExpenseDetailDialog status={row.original.statusCode} expense={row.original} />
          </div>
        );
      },
    },
  ];
  return columns;
};
