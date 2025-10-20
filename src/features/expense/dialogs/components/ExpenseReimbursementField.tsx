import { Banknote } from 'lucide-react';
import { ExpenseFormSchema } from '../lib/formSchema';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import InputFormField from '@/components/form/InputFormField';
import InputFileFormField from '@/components/form/InputFileFormField';

type ExpenseReimbursementFieldProps = {
  form: UseFormReturn<z.infer<typeof ExpenseFormSchema>>;
  isDisabled: boolean;
  isTransport: boolean;
  receiptUrl?: string;
};

const ExpenseReimbursementField = ({ form, isDisabled, isTransport, receiptUrl }: ExpenseReimbursementFieldProps) => {
  const amountDisabled = isTransport || isDisabled;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
        <Banknote className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">金額・領収書</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InputFormField
          form={form}
          name="amount"
          label="総額"
          type="number"
          moneyField={true}
          className="pl-8"
          disabled={amountDisabled}
        />
        <InputFileFormField
          form={form}
          name="receiptFile"
          label="領収書"
          existingFile={receiptUrl}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default ExpenseReimbursementField;
