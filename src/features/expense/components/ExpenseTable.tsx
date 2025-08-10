import { DataTable } from '@/components/table/DataTable';
import { expenseColumns } from './ExpenseColumns';
import { ExpenseItem } from '../type/ExpenseType';
import ExpenseBulkForm from './ExpenseBulkForm';
import { useSearchParams } from 'next/navigation';
import { URL_PARAMS } from '@/consts/urls';

type ExpenseTableProps = {
  expenseData: ExpenseItem[];
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
    />
  );
};

export default ExpenseTable;
