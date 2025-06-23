import { useBatchApproval } from '../hooks/useApprovalForm';
import { BatchApprovalType } from '../lib/formSchema';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Form } from '@/components/ui/form';
import InputTextFormField from '@/components/InputTextFormField';

type ApprovalBulkFormProps = {
  selectedIds: string[];
};

const ApprovalBulkForm = ({ selectedIds }: ApprovalBulkFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { form, handleBatchApproval } = useBatchApproval(async (data: BatchApprovalType) => {
    startTransition(async () => {
      console.log(data);
    });
  });
  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <InputTextFormField
            form={form}
            name="comment"
            placeholder="承認理由やコメントを入力してください...&#10;例：月次勤怠データを確認し、適切であることを確認しました。"
            className="min-h-[100px] resize-none border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
            maxLength={500}
            label="承認コメント"
          />

          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              このコメントは選択された全ての勤怠データに適用されます
            </p>
            <span className="text-xs text-slate-400 dark:text-slate-500">{form.watch('comment')?.length || 0}/500</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            size="lg"
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isPending}
            onClick={() => handleBatchApproval('Approve', selectedIds)}
          >
            {isPending ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            ) : (
              <CheckCircle className="h-5 w-5 mr-2" />
            )}
            {selectedIds.length}件を一括承認
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex-1 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-700 shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isPending}
            onClick={() => handleBatchApproval('Reject', selectedIds)}
          >
            {isPending ? (
              <div className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full mr-2" />
            ) : (
              <XCircle className="h-5 w-5 mr-2" />
            )}
            {selectedIds.length}件を一括却下
          </Button>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">重要な注意事項</h4>
              <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1">
                <li>• 一括処理は取り消すことができません</li>
                <li>• 承認・却下を実行する前に、選択内容を再度ご確認ください</li>
                <li>• 処理完了後、関係者にメール通知が送信されます</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ApprovalBulkForm;
