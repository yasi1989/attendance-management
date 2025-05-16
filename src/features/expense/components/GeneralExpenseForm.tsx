'use client';

import InputFormField from '@/components/InputFormField';
import InputTextFormField from '@/components/InputTextFormField';
import InputCalenderFormField from '@/components/InputCalenderFormField';
import { Form } from '@/components/ui/form';
import ExpenseFormFooter from './ExpenseFormFooter';
import InputFileFormField from '@/components/InputFileFormField';
import { useGeneralExpenseForm } from '../hooks/useExpenseForm';
import { FormProvider } from 'react-hook-form';
import { ExpenseType } from '../history/type/expenseType';

type GeneralExpenseFormProps = {
  type: 'add' | 'edit';
  expense?: ExpenseType | undefined;
};

export function GeneralExpenseForm({ type, expense }: GeneralExpenseFormProps) {
  const { form, onSubmit } = useGeneralExpenseForm({ type, expense });
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <InputCalenderFormField form={form} name="requestDate" label="申請日" placeholder="日付を選択" required />
            <InputFormField
              form={form}
              name="amount"
              label="金額"
              placeholder="10000"
              type="number"
              required
              moneyField={true}
              className="pl-8"
            />
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
            <InputFileFormField form={form} name="receiptFile" label="領収書" existingFile={expense?.receipt_url} />
          </div>
          <ExpenseFormFooter form={form} />
        </form>
      </Form>
    </FormProvider>
  );
}
