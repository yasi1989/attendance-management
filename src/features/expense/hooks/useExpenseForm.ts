import { useFieldArray, useForm } from 'react-hook-form';
import { GeneralExpenseFormSchema, TransportationExpenseFormSchema } from '../lib/formSchema';
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

export const useTransportationExpenseForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof TransportationExpenseFormSchema>>({
    resolver: zodResolver(TransportationExpenseFormSchema),
    defaultValues: {
      requestDate: new Date(),
      amount: 0,
      description: '',
      receiptFile: undefined,
      routes: [{ from: '', to: '', fare: 0 }],
    },
    mode: 'onChange',
  });

  const onSubmit = (data: z.infer<typeof TransportationExpenseFormSchema>) => {
    startTransition(async () => {
      console.log(data);
    });
  };

  const { fields, append, remove } = useFieldArray({
    name: 'routes',
    control: form.control,
  });

  return { form, onSubmit, isPending, fields, append, remove };
};
