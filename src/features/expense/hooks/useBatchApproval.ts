import { ActionStatusType, BatchExpenseSchema, BatchExpenseType } from '../lib/formSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useBatchExpense = (onSubmit: (data: BatchExpenseType) => Promise<void>) => {
  const form = useForm<BatchExpenseType>({
    resolver: zodResolver(BatchExpenseSchema),
    defaultValues: {
      comment: '',
    },
  });

  const handleBatchExpense = async (action: ActionStatusType, selectedItemIds: string[]) => {
    try {
      if (selectedItemIds.length === 0) {
        throw new Error('申請対象を選択してください');
      }

      const formData = form.getValues();

      const batchExpenseData: BatchExpenseType = {
        ids: selectedItemIds,
        action,
        comment: formData.comment,
        userId: 'current-user-id',
      };

      await onSubmit(batchExpenseData);
      form.reset();
    } catch (error) {
      console.error('一括承認処理でエラーが発生しました:', error);
      throw error;
    }
  };

  return {
    form,
    handleBatchExpense,
  };
};
