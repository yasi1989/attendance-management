import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useEffect, useTransition } from 'react';
import { ExpenseFormSchema } from '../lib/formSchema';
import { ExpenseItem } from '../type/ExpenseType';

type UseExpenseFormProps = {
  type: 'add' | 'edit';
  expense?: ExpenseItem;
};

export const useExpenseForm = ({ type, expense }: UseExpenseFormProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ExpenseFormSchema>>({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues:
      type === 'edit' && expense
        ? {
            id: expense.id,
            expenseType: expense.expenseType,
            expenseDate: expense.expenseDate,
            requestDate: expense.requestDate,
            amount: expense.amount,
            description: expense.description,
            receiptFile: undefined,
            routes: expense.routeInfo?.routeDetails
              ? expense.routeInfo.routeDetails.map((routeDetail) => ({
                  from: routeDetail.from,
                  to: routeDetail.to,
                  fare: routeDetail.fare,
                }))
              : [{ from: '', to: '', fare: 0 }],
          }
        : {
            id: '',
            expenseType: 'General',
            expenseDate: new Date(),
            requestDate: new Date(),
            amount: 0,
            description: '',
            receiptFile: undefined,
            routes: [{ from: '', to: '', fare: 0 }],
          },
    mode: 'onChange',
  });

  const onSubmit = (data: z.infer<typeof ExpenseFormSchema>) => {
    startTransition(async () => {
      console.log(data);
    });
  };

  const { fields, append, remove } = useFieldArray({
    name: 'routes',
    control: form.control,
  });

  const resetToDefault = () => {
    form.clearErrors();
    form.reset(form.getValues());

    requestAnimationFrame(() => {
      form.clearErrors();
    });
  };

  useEffect(() => {
    const watchRoutes = form.watch((value, { name }) => {
      if (name?.startsWith('routes')) {
        const routes = value.routes || [];
        const totalFare = routes.reduce((sum, route) => sum + (Number(route?.fare) || 0), 0);
        form.setValue('amount', totalFare);
      }
    });
    return () => watchRoutes.unsubscribe();
  }, [form]);

  return { form, onSubmit, isSubmitted, fields, append, remove, resetToDefault };
};
