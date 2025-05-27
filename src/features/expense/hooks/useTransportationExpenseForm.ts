import { useFieldArray, useForm } from 'react-hook-form';
import { TransportationExpenseFormSchema } from '../lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useEffect, useTransition } from 'react';
import { ExpenseType, RouteInfoType } from '../history/type/expenseType';

type UseTransportationExpenseFormProps = {
  type: 'add' | 'edit';
  expense?: ExpenseType | undefined;
  routeInfo?: RouteInfoType | undefined;
};

export const useTransportationExpenseForm = ({ type, expense, routeInfo }: UseTransportationExpenseFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof TransportationExpenseFormSchema>>({
    resolver: zodResolver(TransportationExpenseFormSchema),
    defaultValues:
      type === 'edit' && expense
        ? {
            id: expense.id,
            expenseRequestId: routeInfo?.id ?? '',
            requestDate: expense.requestDate,
            amount: expense.amount,
            description: expense.description,
            receiptFile: undefined,
            routes: routeInfo?.routeDetails
              ? routeInfo.routeDetails.map((routeDetail) => ({
                  from: routeDetail.from,
                  to: routeDetail.to,
                  fare: routeDetail.fare,
                }))
              : [{ from: '', to: '', fare: 0 }],
          }
        : {
            id: '',
            expenseRequestId: '',
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

  return { form, onSubmit, isPending, fields, append, remove };
};
