import { User, Building2, Clock, Timer, BarChart3, Settings, List, Check } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getDepartmentPath } from '@/features/admin/employees/lib/departmentUtils';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { AttendanceDetailDialog } from './dialogs/AttendanceDetailDialog';
import { Badge } from '@/components/ui/badge';
import { MonthlyAttendanceApprovalItem } from '../type/monthlyAttendanceApprovalType';
import StatusBadge from '../../../components/StatusBadge';

type AttendanceApprovalsColumnsProps = {
  departments: DepartmentType[];
};

export const columnsDef = ({ departments }: AttendanceApprovalsColumnsProps) => {
  const columns: ColumnDef<MonthlyAttendanceApprovalItem>[] = [
    {
      id: 'select',
      header: ({ table }) => {
        const SubmittedRows = table.getRowModel().rows.filter((row) => row.original.statusCode === 'Submitted');
        const allSubmittedSelected = SubmittedRows.length > 0 && SubmittedRows.every((row) => row.getIsSelected());
        const someSubmittedSelected = SubmittedRows.some((row) => row.getIsSelected());

        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={allSubmittedSelected || (someSubmittedSelected && 'indeterminate')}
              onCheckedChange={(value) => {
                SubmittedRows.forEach((row) => {
                  row.toggleSelected(!!value);
                });
              }}
              aria-label="Select all Submitted"
              className="border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
          </div>
        );
      },
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
          <StatusBadge status={row.original.statusCode} />
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
      accessorKey: 'actualWorkDays',
      id: 'actualWorkDays',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost">
              <Clock />
              出勤
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-slate-900 dark:text-slate-100">{row.original.actualWorkDays}</div>
          <div className="text-slate-500 dark:text-slate-400">/{row.original.totalWorkDays}</div>
        </div>
      ),
    },
    {
      accessorKey: 'totalWorkHours',
      id: 'totalWorkHours',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost">
              <Timer />
              労働
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-slate-900 dark:text-slate-100">{row.original.totalWorkHours}h</div>
          <div className="text-slate-500 dark:text-slate-400">({row.original.regularHours}h)</div>
        </div>
      ),
    },
    {
      accessorKey: 'overtimeHours',
      id: 'overtimeHours',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost">
              <BarChart3 />
              残業
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <Badge
            className={`${
              row.original.overtimeHours > 0
                ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20'
                : 'text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/20'
            }`}
          >
            {row.original.overtimeHours}h
          </Badge>
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
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap gap-1">
            {Object.entries(row.original.categoryBreakdown).map(
              ([category, item]) =>
                item.count > 0 && (
                  <Badge key={category} variant="outline">
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
            <AttendanceDetailDialog status={row.original.statusCode} attendance={row.original} />
          </div>
        );
      },
    },
  ];
  return columns;
};
