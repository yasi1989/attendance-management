import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ERROR_MESSAGE } from '@/consts/validate';
import { updateAccountAction } from '../api/action';
import { UpdateAccountValues, updateAccountSchema } from '../lib/formSchema';

type UseAccountFormProps = {
  name: string;
};

export const useAccountForm = ({ name }: UseAccountFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateAccountValues>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      name,
      avatarFile: undefined,
    },
  });

  const onSubmit = useCallback((values: UpdateAccountValues) => {
    startTransition(async () => {
      try {
        const { success, error } = await updateAccountAction(values);

        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
          return;
        }

        toast.success('アカウント情報を更新しました。');
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${ERROR_MESSAGE.UNEXPECTED_ERROR}: ${error.message}`);
        } else {
          toast.error(ERROR_MESSAGE.SYSTEM_ERROR);
        }
      }
    });
  }, []);

  const resetToDefault = useCallback(() => {
    form.reset({ name, avatarFile: undefined });
  }, [form, name]);

  return { form, onSubmit, isPending, resetToDefault };
};
