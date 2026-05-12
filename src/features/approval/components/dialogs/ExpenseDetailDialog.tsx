import { useTransition } from 'react';
import DialogHeaderWithClose from '@/components/dialog/DialogHeaderWithClose';
import { DataTable } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { STATUS } from '@/consts/status';
import { useDialogState } from '@/hooks/useDialogState';
import { formatCurrency } from '@/lib/currency';
import { useIndividualApproval } from '../../hooks/useApprovalForm';
import { approvalStepsColumns } from '../../table/ApprovalStepsColumn';
import { ExpenseApprovalRow } from '../../type/approvalType';
import ApprovalActions from './ApprovalActions';

type ExpenseDetailDialogProps = {
  status: string;
  expense: ExpenseApprovalRow;
};

export const ExpenseDetailDialog = ({ status, expense }: ExpenseDetailDialogProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const { form, handleApproval } = useIndividualApproval(
    expense.expenseGroupApprovalStep.id,
    async (action, comment) => {
      startTransition(async () => {
        console.log(action, comment);
      });
    },
  );

  const { open, handleOpenChange, handleCloseButtonClick } = useDialogState({ form });

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
              <ApprovalActions
                form={form}
                handleIndividualApproval={(action) => handleApproval(action)}
                isSubmitted={isSubmitted}
              />
            )}

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <DataTable columns={approvalStepsColumns} data={[expense.expenseGroupApprovalStep]} />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
