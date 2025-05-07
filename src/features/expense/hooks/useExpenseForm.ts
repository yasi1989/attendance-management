import { useForm } from 'react-hook-form';
import { GeneralExpenseFormSchema } from '../lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useTransition } from 'react';

export const useGeneralExpenseForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof GeneralExpenseFormSchema>>({
    resolver: zodResolver(GeneralExpenseFormSchema),
    defaultValues: {
      requestDate: new Date(),
      amount: 0,
      description: '',
      receiptFile: undefined,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: z.infer<typeof GeneralExpenseFormSchema>) => {
    startTransition(async () => {
      console.log(data);
    });
  };

  return { form, onSubmit, isPending };
};
