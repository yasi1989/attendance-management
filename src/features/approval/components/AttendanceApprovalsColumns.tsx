import { ChevronsUpDown, User, Building2, Calendar, Clock, Timer, BarChart3, Settings } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MonthlyAttendanceApprovalType } from '../type/monthlyAttendanceApprovalType';
import { Checkbox } from '@/components/ui/checkbox';
import { getDepartmentPath } from '@/features/company-admin/employees/lib/departmentUtils';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { Badge } from '@/components/ui/badge';
import { AttendanceDetailDialog } from './AttendanceDetailDialog';

export const columnsDef = (status: 'Pending' | 'Approved', departments: DepartmentType[]) => {
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
          <Button variant="ghost" className="h-6 px-2 text-xs text-slate-700 dark:text-slate-300 cursor-default">
            <User className="mr-1 h-4 w-4" />
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
        enableFilter: true,
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
      header: ({ column }) => (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-6 px-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <Building2 className="mr-1 h-4 w-4" />
            所属
            <ChevronsUpDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const departmentPath = getDepartmentPath(departments, row.original.user.departmentId);
        const pathParts = departmentPath.split(' > ');

        return (
          <div className="w-32">
            {pathParts.length > 1 ? (
              <div className="space-y-0.5">
                <div className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate" title={departmentPath}>
                  {pathParts[pathParts.length - 1]}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate" title={departmentPath}>
                  {pathParts.slice(0, -1).join(' > ')}
                </div>
              </div>
            ) : (
              <div className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate" title={departmentPath}>
                {departmentPath}
              </div>
            )}
          </div>
        );
      },
      meta: {
        enableFilter: true,
        japaneseLabel: '所属',
      },
      filterFn: (row, _id, filterValue) => {
        const department = departments.find((d: DepartmentType) => d.id === row.original.user.departmentId);
        const departmentPath = getDepartmentPath(departments, row.original.user.departmentId);
        return department
          ? department.departmentName.includes(filterValue) || departmentPath.includes(filterValue)
          : false;
      },
      sortingFn: (row, _id, filterValue) => {
        const department = departments.find((d: DepartmentType) => d.id === row.original.user.departmentId);
        return department ? department.departmentName.localeCompare(filterValue) : 0;
      },
    },
    {
      accessorKey: 'month',
      id: 'month',
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="h-8 px-3 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <Calendar className="ml-1 h-4 w-4" />
              月
              <ChevronsUpDown className="ml-1 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-sm text-slate-900 dark:text-slate-100">
            <div className="text-xs font-medium text-slate-900 dark:text-slate-100">{row.original.month}月</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{row.original.year}年</div>
          </div>
        </div>
      ),
      meta: {
        enableFilter: true,
        japaneseLabel: '対象月',
      },
    },
    {
      accessorKey: 'actualWorkDays',
      id: 'actualWorkDays',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost" className="h-6 px-2 text-xs text-slate-700 dark:text-slate-300 cursor-default">
              <Clock className="h-3 w-3" />
              出勤
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-slate-900 dark:text-slate-100">{row.original.actualWorkDays}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">/{row.original.totalWorkDays}</div>
        </div>
      ),
    },
    {
      accessorKey: 'totalWorkHours',
      id: 'totalWorkHours',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost" className="h-6 px-2 text-xs text-slate-700 dark:text-slate-300 cursor-default">
              <Timer className="h-3 w-3" />
              労働
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-slate-900 dark:text-slate-100">{row.original.totalWorkHours}h</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">({row.original.regularHours}h)</div>
        </div>
      ),
    },
    {
      accessorKey: 'overtimeHours',
      id: 'overtimeHours',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost" className="h-6 px-2 text-xs text-slate-700 dark:text-slate-300 cursor-default">
              <BarChart3 className="h-3 w-3" />
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
      accessorKey: 'categoryBreakdown',
      id: 'categoryBreakdown',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost" className="h-6 px-2 text-xs text-slate-700 dark:text-slate-300 cursor-default">
              内訳
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1 w-24">
          {Object.entries(row.original.categoryBreakdown).map(
            ([category, data]) =>
              data.count > 0 && (
                <Badge
                  key={category}
                  variant="outline"
                  className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700 px-1 py-0"
                >
                  {data.name}
                  {data.count}
                </Badge>
              ),
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost" className="h-6 px-2 text-xs text-slate-700 dark:text-slate-300 cursor-default">
              <Settings className="h-3 w-3" />
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
