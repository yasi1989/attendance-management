import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useIndividualApproval } from '../hooks/useApprovalForm';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { MonthlyExpenseApprovalType } from '../type/monthlyExpenseApprovalType';
import { IndividualApprovalType } from '../lib/formSchema';
import { Form } from '@/components/ui/form';
import { useTransition } from 'react';
import InputTextFormField from '@/components/InputTextFormField';
import { formatCurrency } from '@/lib/currencyUtils';

type ExpenseDetailDialogProps = {
  status: 'Pending' | 'Approved';
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
        <DialogContent className="max-w-2xl">
          <form>
            <DialogHeader>
              <DialogTitle>
                {expense.user.lastName}
                {expense.user.firstName} ({expense.year}年{expense.month}月)
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <h4 className="font-medium">申請サマリー</h4>
                  <div className="bg-gray-50 p-3 rounded space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>総額:</span>
                      <span>{formatCurrency(expense.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>件数:</span>
                      <span>{expense.itemCount}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">経費内訳</h4>
                  <div className="bg-blue-50 p-3 rounded space-y-1 text-sm">
                    {Object.entries(expense.categoryBreakdown).map(([category, data]) => (
                      <div key={category} className="flex justify-between">
                        <span>{data.name}:</span>
                        <span>
                          {formatCurrency(data.amount)} ({data.count}件)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {expense.issues.length > 0 && (
                <div className="bg-yellow-50 p-3 rounded">
                  <h4 className="font-medium text-yellow-800 mb-2">注意事項</h4>
                  <ul className="space-y-1 text-sm">
                    {expense.issues.includes('high_amount') && (
                      <li className="text-red-600">⚠ 高額申請のため上位承認が必要です</li>
                    )}
                  </ul>
                </div>
              )}

              <InputTextFormField
                label="承認コメント"
                name="comment"
                form={form}
                placeholder="承認理由やコメントを入力..."
                className="mt-1 min-h-[80px] resize-none"
                maxLength={500}
              />

              {status === 'Pending' && (
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => handleIndividualApproval('approve')}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isPending}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    承認する
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleIndividualApproval('reject')}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    disabled={isPending}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    却下する
                  </Button>
                </div>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};
