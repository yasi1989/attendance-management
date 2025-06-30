import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useIndividualApproval } from '../../hooks/useApprovalForm';
import { Button } from '@/components/ui/button';
import { MonthlyExpenseApprovalType } from '../../type/monthlyExpenseApprovalType';
import { IndividualApprovalType } from '../../lib/formSchema';
import { Form } from '@/components/ui/form';
import { useTransition } from 'react';
import { formatCurrency } from '@/lib/currency';
import { StatusType } from '@/types/statusType';
import { DataTable } from '@/components/DataTable';
import { columns } from '../../components/ApprovalStepsColumn';
import ApprovalFooter from './ApprovalActions';

type ExpenseDetailDialogProps = {
  status: StatusType;
  expense: MonthlyExpenseApprovalType;
};

export const ExpenseDetailDialog = ({ status, expense }: ExpenseDetailDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const { form, handleIndividualApproval } = useIndividualApproval(
    expense.id,
    async (approvalData: IndividualApprovalType) => {
      startTransition(async () => {
        console.log(approvalData);
      });
    },
  );

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            詳細
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
          <form>
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">
                {expense.user.lastName}
                {expense.user.firstName} ({expense.year}年{expense.month}月)
              </DialogTitle>
            </DialogHeader>
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

              {expense.issues.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">注意事項</h4>
                  <ul className="space-y-1 text-sm">
                    {expense.issues.includes('high_amount') && (
                      <li className="text-red-600 dark:text-red-400">⚠ 高額申請のため上位承認が必要です</li>
                    )}
                  </ul>
                </div>
              )}

              {status === 'Pending' && (
                <ApprovalFooter
                  form={form}
                  handleIndividualApproval={(status) => handleIndividualApproval(status)}
                  isPending={isPending}
                />
              )}

              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <DataTable columns={columns} data={expense.approvalSteps} />
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};
