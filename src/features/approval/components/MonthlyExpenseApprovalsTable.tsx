import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/table/DataTable';
import { URL_PARAMS } from '@/consts/urls';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { createExpenseApprovalsColumns } from '../table/CreateExpenseApprovalsColumns';
import { MonthlyExpenseApprovalItem } from '../type/monthlyExpenseApprovalType';
import ApprovalBulkForm from './ApprovalBulkForm';

type MonthlyExpenseApprovalsTableProps = {
  expenses: MonthlyExpenseApprovalItem[];
  departments: DepartmentType[];
};

const MonthlyExpenseApprovalsTable = ({ expenses, departments }: MonthlyExpenseApprovalsTableProps) => {
  const searchParams = useSearchParams();
  const currentYear = searchParams.get(URL_PARAMS.approval.YEAR);
  const currentMonth = searchParams.get(URL_PARAMS.approval.MONTH);
  const currentStatus = searchParams.get(URL_PARAMS.approval.STATUS);
  const renderBulkActions = (selectedIds: string[]) => <ApprovalBulkForm selectedIds={selectedIds} />;
  const filterKey = `${currentYear}-${currentMonth}-${currentStatus}`;

  return (
    <DataTable
      columns={createExpenseApprovalsColumns({ departments })}
      data={expenses}
      enableSelection
      enableFilter
      renderBulkActions={renderBulkActions}
      filterKey={filterKey}
    />
  );
};

export default MonthlyExpenseApprovalsTable;
