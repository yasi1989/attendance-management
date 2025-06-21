import { DataTable } from '@/components/DataTable';
import { MonthlyAttendanceApprovalType } from '../type/monthlyAttendanceApprovalType';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { columnsDef } from './AttendanceApprovalsColumns';
import BulkApprovalsForm from './BulkApprovalsForm';

type MonthlyAttendanceApprovalsTableProps = {
  status: 'Pending' | 'Approved';
  attendances: MonthlyAttendanceApprovalType[];
  departments: DepartmentType[];
};

const MonthlyAttendanceApprovalsTable = ({ status, attendances, departments }: MonthlyAttendanceApprovalsTableProps) => {
  const columns = columnsDef(status, departments);
  const renderBulkActions = (selectedIds: string[]) => <BulkApprovalsForm selectedIds={selectedIds} />;
  return <DataTable columns={columns} data={attendances} enableSelection renderBulkActions={renderBulkActions} />;
};

export default MonthlyAttendanceApprovalsTable;
