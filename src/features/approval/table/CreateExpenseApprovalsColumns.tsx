import { ColumnDef } from '@tanstack/react-table';
import { Building2, Check, Clock, List, Settings, Timer, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getDepartmentPath } from '@/features/admin/employees/lib/departmentUtils';
import { Department } from '@/lib/actionTypes';
import { formatCurrency } from '@/lib/currency';
import { canPerformApprovalOrRejection } from '@/lib/status';
import ApprovalStatusBadge from '../../../components/layout/StatusBadge';
import { ExpenseDetailDialog } from '../components/dialogs/ExpenseDetailDialog';
import { ExpenseApprovalRow } from '../type/approvalType';

type ExpenseApprovalsColumnsProps = {
  departments: Department[];
};

export const createExpenseApprovalsColumns = ({
  departments,
}: ExpenseApprovalsColumnsProps): ColumnDef<ExpenseApprovalRow>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => {
        const submittedRows = table
          .getRowModel()
          .rows.filter((row) => canPerformApprovalOrRejection(row.original.groupExpenseApproval.statusCode));
        const allSubmittedSelected = submittedRows.length > 0 && submittedRows.every((row) => row.getIsSelected());
        const someSubmittedSelected = submittedRows.some((row) => row.getIsSelected());

        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={allSubmittedSelected || (someSubmittedSelected && 'indeterminate')}
              onCheckedChange={(value) => {
                submittedRows.forEach((row) => {
                  row.toggleSelected(!!value);
                });
              }}
              aria-label="Select all Submitted"
              className="border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            disabled={!canPerformApprovalOrRejection(row.original.groupExpenseApproval.statusCode)}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
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
        <div className="font-semibold text-slate-900 dark:text-slate-100" title={row.original.user.name}>
          {row.original.user.name}
        </div>
      ),
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '従業員',
      },
      filterFn: (row, _id, filterValue) => row.original.user.name.includes(filterValue),
    },
    {
      id: 'status',
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <Check />
            状態
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <ApprovalStatusBadge status={row.original.groupExpenseApproval.statusCode} />
        </div>
      ),
    },
    {
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
        const departmentPath = getDepartmentPath(departments, row.original.user.departmentId ?? undefined);
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
        const department = departments.find((d: Department) => d.id === row.original.user.departmentId);
        const departmentPath = getDepartmentPath(departments, row.original.user.departmentId ?? undefined);
        return department
          ? department.departmentName.includes(filterValue) || departmentPath.includes(filterValue)
          : false;
      },
    },
    {
      id: 'totalAmount',
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <Clock />
            申請金額
          </Button>
        </div>
      ),
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
      id: 'itemCount',
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <Timer />
            件数
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-slate-900 dark:text-slate-100">{row.original.itemCount}</div>
        </div>
      ),
    },
    {
      id: 'categoryBreakdown',
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <List />
            内訳
          </Button>
        </div>
      ),
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
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <Settings />
            操作
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <ExpenseDetailDialog status={row.original.groupExpenseApproval.statusCode} expense={row.original} />
        </div>
      ),
    },
  ];
};
