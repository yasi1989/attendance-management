import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ERROR_MESSAGE } from '@/consts/validate';
import { submitExpensesAction } from '../api/action';
import { BatchExpenseSchema, BatchExpenseType } from '../lib/formSchema';

type UseExpenseSubmitProps = {
  onSuccess?: () => void;
};

export const useExpenseSubmit = ({ onSuccess }: UseExpenseSubmitProps = {}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<BatchExpenseType>({
    resolver: zodResolver(BatchExpenseSchema),
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = (expenseIds: string[]) => {
    startTransition(async () => {
      try {
        const values = form.getValues();
        const { success, error } = await submitExpensesAction(expenseIds, values);

        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
          return;
        }

        toast.success('申請が完了しました。');
        form.reset();
        onSuccess?.();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${ERROR_MESSAGE.UNEXPECTED_ERROR}: ${error.message}`);
        } else {
          toast.error(ERROR_MESSAGE.SYSTEM_ERROR);
        }
      }
    });
  };

  return { form, onSubmit, isPending };
};
