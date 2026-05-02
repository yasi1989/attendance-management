import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/table/DataTable';
import { URL_PARAMS } from '@/consts/urls';
import { ExpenseWithApproval } from '@/lib/actionTypes';
import ExpenseBulkForm from '../submission/components/ExpenseBulkForm';
import { expenseColumns } from '../table/ExpenseColumns';

type ExpenseTableProps = {
  expenseData: ExpenseWithApproval[];
};

const ExpenseTable = ({ expenseData }: ExpenseTableProps) => {
  const searchParams = useSearchParams();
  const currentYear = searchParams.get(URL_PARAMS.expense.YEAR);
  const currentMonth = searchParams.get(URL_PARAMS.expense.MONTH);
  const currentStatus = searchParams.get(URL_PARAMS.expense.STATUS);
  const currentExpenseType = searchParams.get(URL_PARAMS.expense.EXPENSE_TYPE);

  const renderBulkActions = (selectedIds: string[]) => <ExpenseBulkForm selectedIds={selectedIds} />;
  const filterKey = `${currentYear}-${currentMonth}-${currentStatus}-${currentExpenseType}`;
  return (
    <DataTable
      columns={expenseColumns}
      data={expenseData}
      enableFilter
      enableSelection
      renderBulkActions={renderBulkActions}
      filterKey={filterKey}
      getRowId={(item) => (item as ExpenseWithApproval).id}
    />
  );
};

export default ExpenseTable;
