import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/table/DataTable';
import { URL_PARAMS } from '@/consts/urls';
import { Department } from '@/lib/actionTypes';
import { createAttendanceApprovalsColumns } from '../table/CreateAttendanceApprovalsColumns';
import { AttendanceApprovalRow } from '../type/approvalType';
import ApprovalBulkForm from './ApprovalBulkForm';

type MonthlyAttendanceApprovalsTableProps = {
  attendances: AttendanceApprovalRow[];
  departments: Department[];
};

const MonthlyAttendanceApprovalsTable = ({ attendances, departments }: MonthlyAttendanceApprovalsTableProps) => {
  const searchParams = useSearchParams();
  const currentYear = searchParams.get(URL_PARAMS.approval.YEAR);
  const currentMonth = searchParams.get(URL_PARAMS.approval.MONTH);
  const currentStatus = searchParams.get(URL_PARAMS.approval.STATUS);
  const renderBulkActions = (selectedIds: string[]) => <ApprovalBulkForm selectedIds={selectedIds} />;
  const filterKey = `${currentYear}-${currentMonth}-${currentStatus}`;

  return (
    <DataTable
      columns={createAttendanceApprovalsColumns({ departments })}
      data={attendances}
      enableSelection
      enableFilter
      renderBulkActions={renderBulkActions}
      filterKey={filterKey}
    />
  );
};

export default MonthlyAttendanceApprovalsTable;
