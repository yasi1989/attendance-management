'use client';

import { Card, CardContent } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { StatusTypeWithAll } from '@/types/statusType';
import CommonPageHeader from '@/components/layout/CommonPageHeader';
import ExpenseFilterSelector from '@/features/expense/components/ExpenseFilterSelector';
import ExpenseTable from '@/features/expense/components/ExpenseTable';
import { ExpenseUpsertDialog } from '@/features/expense/dialogs/components/ExpenseUpsertDialog';
import { ExpenseItem } from '@/features/expense/type/ExpenseType';
import { AddButton } from '@/components/button/AddButton';
import { ExpenseCategoryTypeWithAll } from '@/types/expense';

type ExpensePresentationalProps = {
  expenseData: ExpenseItem[];
  currentYear: number;
  currentMonth: number;
  currentStatus: StatusTypeWithAll;
  currentExpenseType: ExpenseCategoryTypeWithAll;
};

const ExpensePresentational = ({
  expenseData,
  currentYear,
  currentMonth,
  currentStatus,
  currentExpenseType,
}: ExpensePresentationalProps) => {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 overflow-hidden">
      <CommonPageHeader
        title="経費申請"
        description="交通費、一般経費の申請及び管理ができます。"
        icon={<DollarSign className="w-6 h-6 text-white" />}
        actionDialog={<ExpenseUpsertDialog triggerContent={<AddButton label="経費申請" />} />}
      />

      <CardContent className="bg-gradient-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border-t border-slate-200/30 dark:border-slate-700/30 p-6 space-y-6">
        <ExpenseFilterSelector
          currentYear={currentYear}
          currentMonth={currentMonth}
          currentStatus={currentStatus}
          currentExpenseType={currentExpenseType}
        />
        <div className="rounded-lg overflow-hidden">
          <ExpenseTable expenseData={expenseData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensePresentational;
