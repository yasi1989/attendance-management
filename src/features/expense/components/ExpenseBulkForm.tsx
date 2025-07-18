import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Send } from 'lucide-react';
import { Form } from '@/components/ui/form';
import InputTextFormField from '@/components/form/InputTextFormField';
import { useBatchExpense } from '../hooks/useBatchApproval';
import { BatchExpenseType } from '../lib/formSchema';

type ExpenseBulkFormProps = {
  selectedIds: string[];
};

const ExpenseBulkForm = ({ selectedIds }: ExpenseBulkFormProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const { form, handleBatchExpense } = useBatchExpense(async (data: BatchExpenseType) => {
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
            placeholder="申請理由やコメントを入力してください...&#10;例：月次経費データを確認し、領収書も適切に添付されていることを確認しました。"
            className="min-h-[100px] resize-none border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
            maxLength={500}
            label="申請コメント"
            disabled={isSubmitted}
          />

          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              このコメントは選択された全ての経費データに適用されます
            </p>
            <span className="text-xs text-slate-400 dark:text-slate-500">{form.watch('comment')?.length || 0}/500</span>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Button
            type="button"
            size="lg"
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isSubmitted}
            onClick={() => handleBatchExpense('Draft', selectedIds)}
          >
            {isSubmitted ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            ) : (
              <Send className="h-5 w-5 mr-2" />
            )}
            {selectedIds.length}件を一括申請
          </Button>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">申請に関する注意事項</h4>
              <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1">
                <li>• 申請後は承認されるまで経費データの編集ができません</li>
                <li>• 申請内容に不備がある場合は差し戻される可能性があります</li>
                <li>• 申請完了後、承認者にメール通知が送信されます</li>
                <li>• 領収書の添付忘れがないか再度ご確認ください</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ExpenseBulkForm;
