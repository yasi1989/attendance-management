import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/table/DataTable';
import { REQUEST_CATEGORIES } from '@/consts/requestsCategory';
import { URL_PARAMS } from '@/consts/urls';
import { Department } from '@/lib/actionTypes';
import { createExpenseApprovalsColumns } from '../table/CreateExpenseApprovalsColumns';
import { ExpenseApprovalRow } from '../type/approvalType';
import ApprovalBulkForm from './ApprovalBulkForm';

type MonthlyExpenseApprovalsTableProps = {
  expenses: ExpenseApprovalRow[];
  departments: Department[];
};

const MonthlyExpenseApprovalsTable = ({ expenses, departments }: MonthlyExpenseApprovalsTableProps) => {
  const searchParams = useSearchParams();
  const currentYear = searchParams.get(URL_PARAMS.approval.YEAR);
  const currentMonth = searchParams.get(URL_PARAMS.approval.MONTH);
  const currentStatus = searchParams.get(URL_PARAMS.approval.STATUS);
  const renderBulkActions = (selectedIds: string[]) => (
    <ApprovalBulkForm selectedIds={selectedIds} target={REQUEST_CATEGORIES.EXPENSE.value} />
  );
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
