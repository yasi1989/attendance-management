import { DataTable } from '@/components/DataTable';
import { MonthlyExpenseApprovalType } from '../type/monthlyExpenseApprovalType';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { columnsDef } from './ExpenseApprovalsColumns';
import BulkApprovalsForm from './BulkApprovalsForm';
import { StatusType } from '@/features/shared/type/statusType';

type MonthlyExpenseApprovalsTableProps = {
  status: StatusType;
  expenses: MonthlyExpenseApprovalType[];
  departments: DepartmentType[];
};

const MonthlyExpenseApprovalsTable = ({ status, expenses, departments }: MonthlyExpenseApprovalsTableProps) => {
  const columns = columnsDef({ status, departments });
  const renderBulkActions = (selectedIds: string[]) => <BulkApprovalsForm selectedIds={selectedIds} />;
  return <DataTable columns={columns} data={expenses} enableSelection enableFilter renderBulkActions={renderBulkActions} />;
};

export default MonthlyExpenseApprovalsTable;
