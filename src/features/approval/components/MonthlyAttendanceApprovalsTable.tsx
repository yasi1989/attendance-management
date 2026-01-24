import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/table/DataTable';
import { URL_PARAMS } from '@/consts/urls';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { createAttendanceApprovalsColumns } from '../table/CreateAttendanceApprovalsColumns';
import { MonthlyAttendanceApprovalItem } from '../type/monthlyAttendanceApprovalType';
import ApprovalBulkForm from './ApprovalBulkForm';

type MonthlyAttendanceApprovalsTableProps = {
  attendances: MonthlyAttendanceApprovalItem[];
  departments: DepartmentType[];
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
