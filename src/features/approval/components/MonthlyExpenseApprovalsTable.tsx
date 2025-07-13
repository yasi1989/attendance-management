import { DataTable } from '@/components/DataTable';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { columnsDef } from './ExpenseApprovalsColumns';
import ApprovalBulkForm from './ApprovalBulkForm';
import { MonthlyExpenseApprovalItem } from '../type/monthlyExpenseApprovalType';
import { useSearchParams } from 'next/navigation';

type MonthlyExpenseApprovalsTableProps = {
  expenses: MonthlyExpenseApprovalItem[];
  departments: DepartmentType[];
};

const MonthlyExpenseApprovalsTable = ({ expenses, departments }: MonthlyExpenseApprovalsTableProps) => {
  const searchParams = useSearchParams();
  const currentYear = searchParams.get('year') || new Date().getFullYear().toString();
  const currentMonth = searchParams.get('month') || (new Date().getMonth() + 1).toString();
  const currentStatus = searchParams.get('status') || 'All';
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
