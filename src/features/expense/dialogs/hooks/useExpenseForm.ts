import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { ExpenseFormSchema } from '../lib/formSchema';
import { ExpenseItem, RouteDetail } from '../../type/ExpenseType';
import { EXPENSE_CATEGORIES } from '@/consts/expense';

type UseExpenseFormProps = {
  expense?: ExpenseItem;
};
const INITIAL_ROUTE = { from: '', to: '', fare: 0 };
const ROUTES_FIELD_NAME = 'routes';
const AMOUNT_FIELD_NAME = 'amount';

export const useExpenseForm = ({ expense }: UseExpenseFormProps) => {
  const [isSubmitted, startTransition] = useTransition();

  const defaultValues = useMemo(() => {
    return expense
      ? {
          id: expense.id,
          expenseType: expense.expenseType,
          expenseDate: expense.expenseDate,
          requestDate: expense.requestDate,
          amount: expense.amount,
          description: expense.description,
          receiptFile: undefined,
          routes: expense.routeDetails
            ? expense.routeDetails.map((routeDetail: RouteDetail) => ({
                from: routeDetail.from,
                to: routeDetail.to,
                fare: routeDetail.fare,
              }))
            : [INITIAL_ROUTE],
        }
      : {
          id: '',
          expenseType: EXPENSE_CATEGORIES.GENERAL.value,
          expenseDate: new Date(),
          requestDate: new Date(),
          amount: 0,
          description: '',
          receiptFile: undefined,
          routes: [INITIAL_ROUTE],
        };
  }, [expense]);

  const form = useForm<z.infer<typeof ExpenseFormSchema>>({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: ROUTES_FIELD_NAME,
    control: form.control,
  });

  const expenseType = form.watch('expenseType');

  const onSubmit = useCallback((data: z.infer<typeof ExpenseFormSchema>) => {
    startTransition(async () => {
      const cleanedData = {
        ...data,
        routes: data.expenseType === EXPENSE_CATEGORIES.TRANSPORT.value ? data.routes : [],
      };
      console.log(cleanedData);
    });
  }, []);

  const handleExpenseTypeChange = useCallback(
    (value: string) => {
      if (value !== EXPENSE_CATEGORIES.TRANSPORT.value) {
        form.setValue(ROUTES_FIELD_NAME, [INITIAL_ROUTE]);
        form.setValue(AMOUNT_FIELD_NAME, 0);
      }
    },
    [form],
  );

  const handleAddRoute = useCallback(() => {
    append(INITIAL_ROUTE);
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

  const { watch, setValue } = form;
  useEffect(() => {
    if (expenseType === EXPENSE_CATEGORIES.TRANSPORT.value) {
      const subscription = watch((value, { name }) => {
        if (name?.startsWith(ROUTES_FIELD_NAME)) {
          const routes = value.routes || [];
          const totalFare = routes.reduce((sum, route) => sum + (Number(route?.fare) || 0), 0);
          setValue(AMOUNT_FIELD_NAME, totalFare);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, setValue, expenseType]);

  return {
    form,
    onSubmit,
    isSubmitted,
    fields,
    handleAddRoute,
    handleRemoveRoute,
    expenseType,
    handleExpenseTypeChange,
    resetToDefault,
  };
};
