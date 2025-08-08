'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Clock, DollarSign } from 'lucide-react';
import { StatusType } from '@/types/statusType';
import CommonPageHeader from '@/components/layout/CommonPageHeader';
import ExpenseFilterSelector from '@/features/expense/components/ExpenseFilterSelector';
import ExpenseTable from '@/features/expense/components/ExpenseTable';
import { ExpenseUpsertDialog } from '@/features/expense/dialogs/components/ExpenseUpsertDialog';
import { ExpenseItem, ExpenseTypeFilter } from '@/features/expense/type/ExpenseType';
import { AddButton } from '@/components/button/AddButton';
import { EXPENSE_UI } from '@/features/expense/const/ui';

type ExpensePresentationalProps = {
  expenseData: ExpenseItem[];
  currentYear: number;
  currentMonth: number;
  currentStatus: StatusType;
  currentExpenseType: ExpenseTypeFilter;
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
        title={EXPENSE_UI.PAGE.TITLE}
        description={EXPENSE_UI.PAGE.DESCRIPTION}
        icon={<DollarSign className="w-6 h-6 text-white" />}
        actionDialog={
          <ExpenseUpsertDialog type="add" triggerContent={<AddButton label={EXPENSE_UI.PAGE.ADD_BUTTON_LABEL} />} />
        }
      />

      <CardContent className="bg-gradient-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border-t border-slate-200/30 dark:border-slate-700/30 p-6 space-y-6">
        <ExpenseFilterSelector
          currentYear={currentYear}
          currentMonth={currentMonth}
          currentStatus={currentStatus}
          currentExpenseType={currentExpenseType}
        />
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">{EXPENSE_UI.PAGE.INFO_SECTION.TITLE}</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">{EXPENSE_UI.PAGE.INFO_SECTION.DESCRIPTION}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden">
          <ExpenseTable expenseData={expenseData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensePresentational;
