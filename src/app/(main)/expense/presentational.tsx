'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { StatusType } from '@/types/statusType';
import CommonPageHeader from '@/components/CommonPageHeader';
import { ExpenseItem, ExpenseType } from '@/features/expense/history/type/expenseDataType';
import ExpenseFilterSelector from '@/features/expense/components/ExpenseFilterSelector';

type ExpensePresentationalProps = {
  expenseData: ExpenseItem[];
  currentYear: number;
  currentMonth: number;
  currentStatus: StatusType;
  currentExpenseType: ExpenseType;
};

const ExpensePresentational = ({
  expenseData,
  currentYear,
  currentMonth,
  currentStatus,
  currentExpenseType,
}: ExpensePresentationalProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
        <CommonPageHeader title="経費申請" description="交通費、一般経費の申請及び管理ができます。" />

        <CardContent className="space-y-4">
          <ExpenseFilterSelector currentYear={currentYear} currentMonth={currentMonth} currentStatus={currentStatus} currentExpenseType={currentExpenseType} />
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">経費申請管理</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  従業員の経費データを確認し、申請処理を行います
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <MonthlyAttendanceApprovalsTable attendances={attendances} departments={myCompanyDepartments} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensePresentational;
