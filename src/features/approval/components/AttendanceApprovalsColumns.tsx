import { User, Building2, Calendar, Clock, Timer, BarChart3, Settings } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MonthlyAttendanceApprovalType } from '../type/monthlyAttendanceApprovalType';
import { Checkbox } from '@/components/ui/checkbox';
import { getDepartmentPath } from '@/features/admin/employees/lib/departmentUtils';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { StatusType } from '@/types/statusType';
import { AttendanceDetailDialog } from './dialogs/AttendanceDetailDialog';

type AttendanceApprovalsColumnsProps = {
  status: StatusType;
  departments: DepartmentType[];
};

export const columnsDef = ({ status, departments }: AttendanceApprovalsColumnsProps) => {
  const checkboxColumns: ColumnDef<MonthlyAttendanceApprovalType>[] = [
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
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
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
  ];

  const columns: ColumnDef<MonthlyAttendanceApprovalType>[] = [
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
          className="text-sm font-semibold text-slate-900 dark:text-slate-100"
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
      accessorKey: 'month',
      id: 'month',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost">
              <Calendar />
              月
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-sm text-slate-900 dark:text-slate-100">
            <div className="text-slate-900 dark:text-slate-100">{row.original.month}月</div>
            <div className="text-slate-500 dark:text-slate-400">{row.original.year}年</div>
          </div>
        </div>
      ),
      meta: {
        enableColumnFilter: true,
        japaneseLabel: '対象月',
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
          <div
            className={`${
              row.original.overtimeHours > 0
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {row.original.overtimeHours}h
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
            <AttendanceDetailDialog status={status} attendance={row.original} />
          </div>
        );
      },
    },
  ];
  return status === 'Pending' ? [...checkboxColumns, ...columns] : columns;
};
