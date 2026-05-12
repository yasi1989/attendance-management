import { ColumnDef } from '@tanstack/react-table';
import { BarChart3, Building2, Check, Clock, List, Settings, Timer, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ATTENDANCES } from '@/consts/attendance';
import { getDepartmentPath } from '@/features/admin/employees/lib/departmentUtils';
import { Department } from '@/lib/actionTypes';
import { canPerformApprovalOrRejection } from '@/lib/status';
import StatusBadge from '../../../components/layout/StatusBadge';
import { AttendanceDetailDialog } from '../components/dialogs/AttendanceDetailDialog';
import { AttendanceApprovalRow } from '../type/approvalType';

type AttendanceApprovalsColumnsProps = {
  departments: Department[];
};

export const createAttendanceApprovalsColumns = ({
  departments,
}: AttendanceApprovalsColumnsProps): ColumnDef<AttendanceApprovalRow>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => {
        const submittedRows = table
          .getRowModel()
          .rows.filter((row) => canPerformApprovalOrRejection(row.original.monthlyAttendanceApproval.statusCode));
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
            disabled={!canPerformApprovalOrRejection(row.original.monthlyAttendanceApproval.statusCode)}
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
          <StatusBadge status={row.original.monthlyAttendanceApproval.statusCode} />
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
      id: 'actualWorkDays',
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <Clock />
            出勤
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-slate-900 dark:text-slate-100">{row.original.summary.actualWorkDays}</div>
          <div className="text-slate-500 dark:text-slate-400">/{row.original.summary.totalWorkDays}</div>
        </div>
      ),
    },
    {
      id: 'totalWorkHours',
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <Timer />
            労働
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <div className="text-slate-900 dark:text-slate-100">{row.original.summary.totalWorkHours}h</div>
          <div className="text-slate-500 dark:text-slate-400">({row.original.summary.regularHours}h)</div>
        </div>
      ),
    },
    {
      id: 'overtimeHours',
      header: () => (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <BarChart3 />
            残業
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <Badge
            className={
              parseFloat(row.original.summary.overtimeHours) > 0
                ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20'
                : 'text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/20'
            }
          >
            {row.original.summary.overtimeHours}h
          </Badge>
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
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap gap-1">
            {Object.entries(row.original.summary.categoryBreakdown).map(([category, count]) => {
              const label = Object.values(ATTENDANCES).find((a) => a.value === category)?.label ?? category;
              return (
                count > 0 && (
                  <Badge key={category} variant="outline">
                    {label}
                    {count}
                  </Badge>
                )
              );
            })}
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
          <AttendanceDetailDialog
            status={row.original.monthlyAttendanceApproval.statusCode}
            attendance={row.original}
          />
        </div>
      ),
    },
  ];
};
