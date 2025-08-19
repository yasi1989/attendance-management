import { DataTable } from '@/components/table/DataTable';
import { MonthlyAttendanceApprovalItem } from '../type/monthlyAttendanceApprovalType';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { columnsDef } from './AttendanceApprovalsColumns';
import ApprovalBulkForm from './ApprovalBulkForm';
import { useSearchParams } from 'next/navigation';
import { URL_PARAMS } from '@/consts/urls';

type MonthlyAttendanceApprovalsTableProps = {
  attendances: MonthlyAttendanceApprovalItem[];
  departments: DepartmentType[];
};

const MonthlyAttendanceApprovalsTable = ({ attendances, departments }: MonthlyAttendanceApprovalsTableProps) => {
  const searchParams = useSearchParams();
  const currentYear = searchParams.get(URL_PARAMS.approval.YEAR);
  const currentMonth = searchParams.get(URL_PARAMS.approval.MONTH);
  const currentStatus = searchParams.get(URL_PARAMS.approval.STATUS);

  const columns = columnsDef({ departments });
  const renderBulkActions = (selectedIds: string[]) => <ApprovalBulkForm selectedIds={selectedIds} />;
  const filterKey = `${currentYear}-${currentMonth}-${currentStatus}`;

  return (
    <DataTable
      columns={columns}
      data={attendances}
      enableSelection
      enableFilter
      renderBulkActions={renderBulkActions}
      filterKey={filterKey}
    />
  );
};

export default MonthlyAttendanceApprovalsTable;
