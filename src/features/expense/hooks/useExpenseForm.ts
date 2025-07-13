'use client';
import { useForm } from 'react-hook-form';
import { GeneralExpenseFormSchema } from '../lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useTransition } from 'react';
import { ExpenseType } from '../history/type/expenseType';

type useGeneralExpenseFormProps = {
  type: 'add' | 'edit';
  expense?: ExpenseType | undefined;
};

export const useGeneralExpenseForm = ({ type, expense }: useGeneralExpenseFormProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const form = useForm<z.infer<typeof GeneralExpenseFormSchema>>({
    resolver: zodResolver(GeneralExpenseFormSchema),
    defaultValues:
      type === 'edit' && expense
        ? {
            id: expense.id,
            requestDate: expense.requestDate,
            amount: expense.amount,
            description: expense.description,
            receiptFile: undefined,
          }
        : {
            id: '',
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

  return { form, onSubmit, isSubmitted };
};
