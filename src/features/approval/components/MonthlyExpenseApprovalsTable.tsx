import { DataTable } from '@/components/table/DataTable';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { columnsDef } from './ExpenseApprovalsColumns';
import ApprovalBulkForm from './ApprovalBulkForm';
import { MonthlyExpenseApprovalItem } from '../type/monthlyExpenseApprovalType';
import { useSearchParams } from 'next/navigation';
import { URL_PARAMS } from '@/consts/urls';

type MonthlyExpenseApprovalsTableProps = {
  expenses: MonthlyExpenseApprovalItem[];
  departments: DepartmentType[];
};

const MonthlyExpenseApprovalsTable = ({ expenses, departments }: MonthlyExpenseApprovalsTableProps) => {
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
      data={expenses}
      enableSelection
      enableFilter
      renderBulkActions={renderBulkActions}
      filterKey={filterKey}
    />
  );
};

export default MonthlyExpenseApprovalsTable;
