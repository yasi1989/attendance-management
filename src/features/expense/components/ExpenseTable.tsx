import { DataTable } from '@/components/table/DataTable';
import { expenseColumns } from './ExpenseColumns';
import { ExpenseItem } from '../type/ExpenseType';
import ExpenseBulkForm from './ExpenseBulkForm';
import { useSearchParams } from 'next/navigation';

type ExpenseTableProps = {
  expenseData: ExpenseItem[];
};

const ExpenseTable = ({ expenseData }: ExpenseTableProps) => {
  const searchParams = useSearchParams();
  const currentYear = searchParams.get('year') || new Date().getFullYear().toString();
  const currentMonth = searchParams.get('month') || (new Date().getMonth() + 1).toString();
  const currentStatus = searchParams.get('status') || 'All';
  const currentExpenseType = searchParams.get('expense') || 'All';

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
