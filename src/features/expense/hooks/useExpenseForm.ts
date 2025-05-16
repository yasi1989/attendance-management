'use client';
import { useForm } from 'react-hook-form';
import { GeneralExpenseFormSchema, TransportationExpenseFormSchema } from '../lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useTransition } from 'react';
import { ExpenseType, RouteInfoType } from '../history/type/expenseType';

type useGeneralExpenseFormProps = {
  type: 'add' | 'edit';
  expense?: ExpenseType | undefined;
}

export const useGeneralExpenseForm = ({ type, expense }: useGeneralExpenseFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof GeneralExpenseFormSchema>>({
    resolver: zodResolver(GeneralExpenseFormSchema),
    defaultValues: type === 'edit' && expense ? {
      id: expense.id,
      requestDate: expense.request_date,
      amount: expense.amount,
      description: expense.description,
      receiptFile: undefined,
    } : {
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

type UseTransportationExpenseFormProps = {
  type: 'add' | 'edit';
  expense?: ExpenseType | undefined;
  routeInfo?: RouteInfoType | undefined;
}

export const useTransportationExpenseForm = ({ type, expense, routeInfo }: UseTransportationExpenseFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof TransportationExpenseFormSchema>>({
    resolver: zodResolver(TransportationExpenseFormSchema),
    defaultValues: type === 'edit' && expense ? {
      id: expense.id,
      expense_request_id: routeInfo?.id ?? '',
      requestDate: expense.request_date,
      amount: expense.amount,
      description: expense.description,
      receiptFile: undefined,
      routes: routeInfo?.route_details ? routeInfo.route_details.map((routeDetail) => ({
        from: routeDetail.from,
        to: routeDetail.to,
        fare: routeDetail.fare,
      })) : [{ from: '', to: '', fare: 0 }],
    } : {
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

  return { form, onSubmit, isPending };
};
