'use client';

import { Suspense, useState } from 'react';
import DialogHeaderWithClose from '@/components/dialog/DialogHeaderWithClose';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { STATUS } from '@/consts/status';
import { useDialogState } from '@/hooks/useDialogState';
import { formatCurrency } from '@/lib/currency';
import { approveExpenseAction } from '../../api/expenseApprovalAction';
import { fetchExpenseApprovalSteps } from '../../api/fetchApprovalSteps';
import { useIndividualApproval } from '../../hooks/useApprovalForm';
import { ExpenseApprovalRow } from '../../type/approvalType';
import ApprovalActions from './ApprovalActions';
import ApprovalStepsTable from './ApprovalStepsTable';

type ExpenseDetailDialogProps = {
  status: string;
  expense: ExpenseApprovalRow;
};

export const ExpenseDetailDialog = ({ status, expense }: ExpenseDetailDialogProps) => {
  const [stepsPromise, setStepsPromise] = useState<ReturnType<typeof fetchExpenseApprovalSteps> | null>(null);

  const { form, handleApproval, isPending } = useIndividualApproval(async (action, comment) => {
    const result = await approveExpenseAction({
      id: expense.expenseGroupApprovalStep.id,
      action,
      comment,
    });
    if (!result.success) throw new Error(result.error);
  });

  const { open, handleOpenChange: dialogHandleOpenChange, handleCloseButtonClick } = useDialogState({ form });

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && !stepsPromise) {
      setStepsPromise(fetchExpenseApprovalSteps(expense.groupExpenseApproval.id));
    }
    dialogHandleOpenChange(newOpen);
  };

  const approval = expense.groupExpenseApproval;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          詳細
        </Button>
      </DialogTrigger>
      <DialogContent className="[&>button]:hidden w-full sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <form>
          <DialogHeaderWithClose
            title={`${expense.user.name} (${new Date(approval.submittedAt).getFullYear()}年${new Date(approval.submittedAt).getMonth() + 1}月)`}
            onClose={handleCloseButtonClick}
          />
          <div className="flex flex-col space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm sm:text-base">申請サマリー</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>総額:</span>
                    <span className="font-medium">{formatCurrency(expense.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>件数:</span>
                    <span>{expense.itemCount}件</span>
                  </div>
                  {approval.purpose && (
                    <div className="flex justify-between">
                      <span>申請目的:</span>
                      <span>{approval.purpose}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm sm:text-base">経費内訳</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded space-y-1 text-sm">
                  {Object.entries(expense.categoryBreakdown).map(([category, data]) => (
                    <div key={category} className="flex justify-between">
                      <span>{data.name}:</span>
                      <span className="text-right">
                        <div className="font-medium">{formatCurrency(data.amount)}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">({data.count}件)</div>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {status === STATUS.SUBMITTED.value && (
              <ApprovalActions form={form} handleIndividualApproval={handleApproval} isSubmitted={isPending} />
            )}

            <Suspense fallback={<div className="text-sm text-slate-500">読み込み中...</div>}>
              {stepsPromise && <ApprovalStepsTable stepsPromise={stepsPromise} />}
            </Suspense>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
