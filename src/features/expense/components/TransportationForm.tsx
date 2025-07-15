'use client';
import { RouteFormItem } from './RouteFormItem';
import { FormProvider } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import InputCalenderFormField from '@/components/InputCalendarFormField';
import InputFormField from '@/components/InputFormField';
import InputTextFormField from '@/components/InputTextFormField';
import InputFileFormField from '@/components/InputFileFormField';
import ExpenseFormActions from './ExpenseFormActions';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { ExpenseType, RouteInfoType } from '../history/type/expenseDataType';
import { useTransportationExpenseForm } from '../hooks/useTransportationExpenseForm';

type TransportationFormProps = {
  type: 'add' | 'edit';
  expense?: ExpenseType | undefined;
  routeInfo?: RouteInfoType | undefined;
};

export function TransportationForm({ type, expense, routeInfo }: TransportationFormProps) {
  const { form, onSubmit, fields, append, remove } = useTransportationExpenseForm({ type, expense, routeInfo });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <InputCalenderFormField form={form} name="requestDate" label="申請日" placeholder="日付を選択" required />
            <InputTextFormField
              form={form}
              name="description"
              label="説明"
              placeholder="経費の詳細な説明を入力してください"
              description="経費の目的、理由、またはその他の関連情報を入力してください。"
              maxLength={100}
              required
              row={4}
              className="resize-none"
            />
            <div className="space-y-6 bg-stone-50 rounded-lg shadow">
              {fields.map((field, index) => (
                <RouteFormItem
                  key={field.id}
                  index={index}
                  onRemove={() => remove(index)}
                  isRemovable={fields.length > 1}
                />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => append({ from: '', to: '', fare: 0 })}
              >
                <PlusIcon className="h-4 w-4" />
                <span>経路を追加</span>
              </Button>
            </div>
            <InputFormField
              form={form}
              name="amount"
              label="総運賃"
              type="number"
              moneyField={true}
              className="pl-8"
              disabled={true}
            />
            <InputFileFormField form={form} name="receiptFile" label="領収書" existingFile={expense?.receiptUrl} />
          </div>
          <ExpenseFormActions form={form} />
        </form>
      </Form>
    </FormProvider>
  );
}
