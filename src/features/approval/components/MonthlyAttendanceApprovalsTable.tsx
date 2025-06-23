import { DataTable } from '@/components/DataTable';
import { MonthlyAttendanceApprovalType } from '../type/monthlyAttendanceApprovalType';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { columnsDef } from './AttendanceApprovalsColumns';
import ApprovalBulkForm from './ApprovalBulkForm';
import { StatusType } from '@/types/statusType';

type MonthlyAttendanceApprovalsTableProps = {
  status: StatusType;
  attendances: MonthlyAttendanceApprovalType[];
  departments: DepartmentType[];
};

const MonthlyAttendanceApprovalsTable = ({
  status,
  attendances,
  departments,
}: MonthlyAttendanceApprovalsTableProps) => {
  const columns = columnsDef({ status, departments });
  const renderBulkActions = (selectedIds: string[]) => <ApprovalBulkForm selectedIds={selectedIds} />;
  return <DataTable columns={columns} data={attendances} enableSelection enableFilter renderBulkActions={renderBulkActions} />;
};

export default MonthlyAttendanceApprovalsTable;
