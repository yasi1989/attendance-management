import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputFormField from '@/components/InputFormField';
import InputTextFormField from '@/components/InputTextFormField';
import InputCalenderFormField from '@/components/InputCalenderFormField';
import { Form } from '@/components/ui/form';
import ExpenseFormFooter from './ExpenseFormFooter';
import InputFileFormField from '@/components/InputFileFormField';
import { GeneralExpenseFormSchema } from '@/features/expense/lib/formSchema';
export function GeneralExpenseTab() {
  const form = useForm<z.infer<typeof GeneralExpenseFormSchema>>({
    resolver: zodResolver(GeneralExpenseFormSchema),
    defaultValues: {
      requestDate: new Date(),
      amount: 0,
      description: '',
      receiptFile: undefined,
    },
    mode: 'onChange',
  });

  async function onSubmit(data: z.infer<typeof GeneralExpenseFormSchema>) {
    console.log(data);
  }
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
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
            <InputFileFormField form={form} name="receiptFile" label="領収書" required />
          </div>
          <ExpenseFormFooter form={form} />
        </form>
      </Form>
    </FormProvider>
  );
}
