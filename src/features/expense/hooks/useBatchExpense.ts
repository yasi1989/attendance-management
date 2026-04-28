import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { BatchExpenseSchema, BatchExpenseType } from '../lib/formSchema';

export const useBatchExpense = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<BatchExpenseType>({
    resolver: zodResolver(BatchExpenseSchema),
    defaultValues: {
      comment: '',
    },
  });

  const handleBatchSubmit = (selectedIds: string[]) => {
    if (selectedIds.length === 0) return;

    startTransition(async () => {
      //await Promise.all(selectedIds.map((id) => submitExpenseApprovalAction(id)));
      form.reset();
    });
  };

  return {
    form,
    isPending,
    handleBatchSubmit,
  };
};
