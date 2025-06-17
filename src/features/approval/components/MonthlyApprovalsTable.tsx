import { DataTable } from '@/components/DataTable';
import { holidaysColumns } from './HolidaysColumns';
import { MonthlyAttendanceApprovalType } from '../type/monthlyAttendanceApprovalType';

type MonthlyApprovalsTableProps = {
  data: MonthlyAttendanceApprovalType[];
};

const MonthlyApprovalsTable = ({ data }: MonthlyApprovalsTableProps) => {
  return <DataTable columns={holidaysColumns} data={data} />;
};

export default MonthlyApprovalsTable;
