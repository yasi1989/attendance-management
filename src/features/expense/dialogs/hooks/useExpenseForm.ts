import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { ExpenseFormSchema } from '../lib/formSchema';
import { ExpenseItem, ExpenseTypeDB, RouteDetail } from '../../type/ExpenseType';
import { StatusType } from '@/types/statusType';

type UseExpenseFormProps = {
  type: 'add' | 'edit';
  expense?: ExpenseItem;
};

const isFormDisabled = (type: 'add' | 'edit', status: StatusType | undefined): boolean => {
  return type === 'edit' && (status === 'Submitted' || status === 'Approved' || status === undefined);
};

const isValidExpenseType = (value: string): value is ExpenseTypeDB => {
  return value === 'General' || value === 'Transport';
};

export const useExpenseForm = ({ type, expense }: UseExpenseFormProps) => {
  const [isSubmitted, startTransition] = useTransition();

  const defaultValues = useMemo(() => {
    return type === 'edit' && expense
      ? {
          id: expense.id,
          expenseType: expense.expenseType as ExpenseTypeDB,
          expenseDate: expense.expenseDate,
          requestDate: expense.requestDate,
          amount: expense.amount,
          description: expense.description,
          receiptFile: undefined,
          routes: expense.routeInfo?.routeDetails
            ? expense.routeInfo.routeDetails.map((routeDetail: RouteDetail) => ({
                from: routeDetail.from,
                to: routeDetail.to,
                fare: routeDetail.fare,
              }))
            : [{ from: '', to: '', fare: 0 }],
        }
      : {
          id: '',
          expenseType: 'General' as ExpenseTypeDB,
          expenseDate: new Date(),
          requestDate: new Date(),
          amount: 0,
          description: '',
          receiptFile: undefined,
          routes: [{ from: '', to: '', fare: 0 }],
        };
  }, [type, expense]);

  const form = useForm<z.infer<typeof ExpenseFormSchema>>({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'routes',
    control: form.control,
  });

  const expenseType = form.watch('expenseType');

  const isDisabled = useMemo(() => isFormDisabled(type, expense?.statusCode), [type, expense?.statusCode]);

  const onSubmit = useCallback((data: z.infer<typeof ExpenseFormSchema>) => {
    startTransition(async () => {
      const cleanedData = {
        ...data,
        routes: data.expenseType === 'Transport' ? data.routes : [],
      };
      console.log(cleanedData);
    });
  }, []);

  const handleExpenseTypeChange = useCallback(
    (value: string) => {
      if (isValidExpenseType(value)) {
        if (value === 'General') {
          form.setValue('routes', [{ from: '', to: '', fare: 0 }]);
          form.setValue('amount', 0);
        }
      }
    },
    [form],
  );

  const handleAddRoute = useCallback(() => {
    append({ from: '', to: '', fare: 0 });
  }, [append]);
  const handleRemoveRoute = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  const resetToDefault = useCallback(() => {
    form.clearErrors();
    form.reset(defaultValues);

    requestAnimationFrame(() => {
      form.clearErrors();
    });
  }, [form, defaultValues]);

  useEffect(() => {
    if (expenseType === 'Transport') {
      const subscription = form.watch((value, { name }) => {
        if (name?.startsWith('routes')) {
          const routes = value.routes || [];
          const totalFare = routes.reduce((sum, route) => sum + (Number(route?.fare) || 0), 0);
          form.setValue('amount', totalFare);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [form, expenseType]);

  return {
    form,
    onSubmit,
    isSubmitted,
    fields,
    handleAddRoute,
    handleRemoveRoute,
    expenseType,
    isDisabled,
    handleExpenseTypeChange,
    resetToDefault,
  };
};
