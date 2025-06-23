import { DataTable } from '@/components/DataTable';
import { MonthlyExpenseApprovalType } from '../type/monthlyExpenseApprovalType';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { columnsDef } from './ExpenseApprovalsColumns';
import ApprovalBulkForm from './ApprovalBulkForm';
import { StatusType } from '@/types/statusType';

type MonthlyExpenseApprovalsTableProps = {
  status: StatusType;
  expenses: MonthlyExpenseApprovalType[];
  departments: DepartmentType[];
};

const MonthlyExpenseApprovalsTable = ({ status, expenses, departments }: MonthlyExpenseApprovalsTableProps) => {
  const columns = columnsDef({ status, departments });
  const renderBulkActions = (selectedIds: string[]) => <ApprovalBulkForm selectedIds={selectedIds} />;
  return <DataTable columns={columns} data={expenses} enableSelection enableFilter renderBulkActions={renderBulkActions} />;
};

export default MonthlyExpenseApprovalsTable;
