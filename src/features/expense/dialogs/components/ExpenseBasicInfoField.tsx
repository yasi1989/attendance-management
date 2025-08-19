import InputCalendarFormField from '@/components/form/InputCalendarFormField';
import InputSelectFormField from '@/components/form/InputSelectFormField';
import InputTextFormField from '@/components/form/InputTextFormField';
import { Calendar, Lock } from 'lucide-react';
import { useMemo } from 'react';
import { EXPENSE_CATEGORIES } from '@/consts/expense';
import z from 'zod';
import { ExpenseFormSchema } from '../lib/formSchema';
import { UseFormReturn } from 'react-hook-form';

type ExpenseBasicInfoFieldProps = {
  form: UseFormReturn<z.infer<typeof ExpenseFormSchema>>;
  isDisabled: boolean;
  handleExpenseTypeChange: (value: string) => void;
};

const ExpenseBasicInfoField = ({ form, isDisabled, handleExpenseTypeChange }: ExpenseBasicInfoFieldProps) => {
  const expenseTypeOptions = useMemo(() => {
    return Object.values(EXPENSE_CATEGORIES).map((category) => ({
      value: category.value,
      label: category.label,
    }));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">基本情報</h2>
      </div>

      {isDisabled && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex items-start space-x-2">
            <Lock className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 pt-1" />
            <p className="text-xs text-yellow-800 dark:text-yellow-300">
              この経費データは申請済みまたは承認済みのため編集できません。
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputSelectFormField
          form={form}
          name="expenseType"
          label="経費"
          options={expenseTypeOptions}
          onValueChange={handleExpenseTypeChange}
          required
          disabled={isDisabled}
        />
        <InputCalendarFormField
          form={form}
          name="expenseDate"
          label="発生日"
          placeholder="日付を選択"
          required
          disabled={isDisabled}
        />
        <InputCalendarFormField
          form={form}
          name="requestDate"
          label="申請日"
          placeholder="日付を選択"
          required
          disabled={isDisabled}
        />
        <div className="lg:col-span-3">
          <InputTextFormField
            form={form}
            name="description"
            label="説明"
            placeholder="経費の詳細な説明を入力してください"
            maxLength={100}
            required
            row={4}
            className="resize-none"
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseBasicInfoField;
