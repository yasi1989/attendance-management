import { DollarSign } from 'lucide-react';
import MonthlyExpenseApprovalsTable from './MonthlyExpenseApprovalsTable';
import { MonthlyExpenseApprovalItem } from '../type/monthlyExpenseApprovalType';
import { DepartmentType } from '@/features/system/users/type/departmentType';

type ExpenseApprovalsTabsProps = {
  expenses: MonthlyExpenseApprovalItem[];
  myCompanyDepartments: DepartmentType[];
};

const ExpenseApprovalsTabs = ({ expenses, myCompanyDepartments }: ExpenseApprovalsTabsProps) => {
  return (
    <>
      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
          <div>
            <h3 className="font-semibold text-green-900 dark:text-green-100">経費申請管理</h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              経費申請の詳細を確認し、予算に応じた承認処理を行います
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden">
        <MonthlyExpenseApprovalsTable expenses={expenses} departments={myCompanyDepartments} />
      </div>
    </>
  );
};

export default ExpenseApprovalsTabs;
