import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { EXPENSE_CATEGORIES } from '@/consts/expense';
import { createExpenseAction, updateExpenseAction } from '../api/actions';
import { ExpenseFormSchema } from '../lib/formSchema';
import { ExpenseItem, RouteDetail } from '../type/ExpenseType';

type UseExpenseFormProps = {
  groupExpenseApprovalId: string;
  expense?: ExpenseItem;
  onSuccess?: () => void;
};

const INITIAL_ROUTE = { from: '', to: '', fare: 0 } as const;

const buildDefaultValues = (expense?: ExpenseItem) =>
  expense
    ? {
        expenseType: expense.expenseType,
        expenseDate: expense.expenseDate,
        amount: expense.amount,
        description: expense.description,
        receiptUrl: expense.receiptUrl ?? undefined,
        routes: expense.routeDetails?.map((r: RouteDetail) => ({ from: r.from, to: r.to, fare: r.fare })) ?? [
          INITIAL_ROUTE,
        ],
      }
    : {
        expenseType: EXPENSE_CATEGORIES.GENERAL.value,
        expenseDate: new Date(),
        amount: 0,
        description: '',
        receiptUrl: undefined,
        routes: [INITIAL_ROUTE],
      };

export const useExpenseForm = ({ groupExpenseApprovalId, expense, onSuccess }: UseExpenseFormProps) => {
  const [isPending, startTransition] = useTransition();
  const defaultValues = useMemo(() => buildDefaultValues(expense), [expense]);

  const form = useForm<z.infer<typeof ExpenseFormSchema>>({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ name: 'routes', control: form.control });
  const expenseType = form.watch('expenseType');

  const onSubmit = useCallback(
    (data: z.infer<typeof ExpenseFormSchema>) => {
      startTransition(async () => {
        const isTransport = data.expenseType === EXPENSE_CATEGORIES.TRANSPORT.value;
        const payload = { ...data, routeDetails: isTransport ? data.routes : [] };

        const result = expense
          ? await updateExpenseAction(expense.id, payload)
          : await createExpenseAction(groupExpenseApprovalId, payload);

        if (result.success) {
          form.reset(defaultValues);
          onSuccess?.();
        }
      });
    },
    [expense, groupExpenseApprovalId, defaultValues, onSuccess, form],
  );

  const handleExpenseTypeChange = useCallback(
    (value: string | null) => {
      if (value !== EXPENSE_CATEGORIES.TRANSPORT.value) {
        form.setValue('routes', [INITIAL_ROUTE]);
        form.setValue('amount', 0);
      }
    },
    [form],
  );

  const resetToDefault = useCallback(() => {
    form.reset(defaultValues);
    requestAnimationFrame(() => form.clearErrors());
  }, [form, defaultValues]);

  useEffect(() => {
    if (expenseType !== EXPENSE_CATEGORIES.TRANSPORT.value) return;

    const subscription = form.watch((value, { name }) => {
      if (!name?.startsWith('routes')) return;
      const total = (value.routes ?? []).reduce((sum, r) => sum + (Number(r?.fare) || 0), 0);
      form.setValue('amount', total);
    });
    return () => subscription.unsubscribe();
  }, [form, expenseType]);

  return {
    form,
    onSubmit,
    isPending,
    fields,
    handleAddRoute: () => append(INITIAL_ROUTE),
    handleRemoveRoute: (index: number) => remove(index),
    expenseType,
    handleExpenseTypeChange,
    resetToDefault,
  };
};
