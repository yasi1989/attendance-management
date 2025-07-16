import { DataTable } from '@/components/DataTable';
import { expenseColumns } from './ExpenseColumns';
import { ExpenseItem } from '../type/ExpenseType';

type ExpenseTableProps = {
  expenseData: ExpenseItem[];
};

const ExpenseTable = ({ expenseData }: ExpenseTableProps) => {
  return <DataTable columns={expenseColumns} data={expenseData} enableFilter />;
};

export default ExpenseTable;
