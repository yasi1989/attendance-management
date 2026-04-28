import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { EXPENSE_CATEGORIES } from '@/consts/expense';
import { ERROR_MESSAGE } from '@/consts/validate';
import { ExpenseWithApproval } from '@/lib/actionTypes';
import { createExpenseAction, deleteExpenseAction, updateExpenseAction } from '../../api/expenseAction';
import { RouteDetail } from '../../type/ExpenseType';
import { ExpenseFormSchema } from '../lib/formSchema';

type UseExpenseFormProps = {
  expense?: ExpenseWithApproval;
  onSuccess?: () => void;
};

const INITIAL_ROUTE = { from: '', to: '', fare: 0 };

const buildDefaultValues = (expense?: ExpenseWithApproval) =>
  expense
    ? {
        expenseType: expense.expenseType,
        expenseDate: expense.expenseDate,
        amount: Number(expense.amount),
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

export const useExpenseForm = ({ expense, onSuccess }: UseExpenseFormProps) => {
  const [isPending, startTransition] = useTransition();
  const defaultValues = useMemo(() => buildDefaultValues(expense), [expense]);

  const form = useForm<z.infer<typeof ExpenseFormSchema>>({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ name: 'routes', control: form.control });
  const expenseType = form.watch('expenseType');

  const handleExpenseTypeChange = useCallback(
    (value: string | null) => {
      if (value !== EXPENSE_CATEGORIES.TRANSPORT.value) {
        form.setValue('routes', [INITIAL_ROUTE]);
        form.setValue('amount', 0);
      }
    },
    [form],
  );

  const onSubmit = useCallback(
    (data: z.infer<typeof ExpenseFormSchema>) => {
      startTransition(async () => {
        try {
          const isTransport = data.expenseType === EXPENSE_CATEGORIES.TRANSPORT.value;
          const payload = { ...data, routeDetails: isTransport ? data.routes : [] };

          const { success, error } = expense
            ? await updateExpenseAction(expense.id, payload)
            : await createExpenseAction(payload);

          if (!success) {
            toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
            return;
          }

          toast.success(expense ? '経費を更新しました。' : '経費を登録しました。');
          form.reset(defaultValues);
          onSuccess?.();
        } catch (error) {
          if (error instanceof Error) {
            toast.error(`${ERROR_MESSAGE.UNEXPECTED_ERROR}: ${error.message}`);
          } else {
            toast.error(ERROR_MESSAGE.SYSTEM_ERROR);
          }
        }
      });
    },
    [expense, defaultValues, onSuccess, form],
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

export const useDeleteExpense = (expenseId: string) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      try {
        const { success, error } = await deleteExpenseAction(expenseId);

        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
          return;
        }

        toast.success('経費を削除しました。');
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${ERROR_MESSAGE.UNEXPECTED_ERROR}: ${error.message}`);
        } else {
          toast.error(ERROR_MESSAGE.SYSTEM_ERROR);
        }
      }
    });
  };

  return { onDelete, isPending };
};
