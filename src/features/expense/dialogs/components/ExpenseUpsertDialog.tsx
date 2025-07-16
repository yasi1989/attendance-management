import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Banknote, Calendar, Plus, Train } from 'lucide-react';
import InputTextFormField from '@/components/InputTextFormField';
import InputCalendarFormField from '@/components/InputCalendarFormField';
import { RouteFormItem } from './RouteFormItem';
import InputFormField from '@/components/InputFormField';
import InputFileFormField from '@/components/InputFileFormField';
import InputSelectFormField from '@/components/InputSelectFormField';
import { useState } from 'react';
import { StatusType } from '@/types/statusType';
import { useExpenseForm } from '../../hooks/useExpenseForm';
import DialogActionFooter from '@/components/DialogActionFooter';
import { Button } from '@/components/ui/button';
import { ExpenseItem, ExpenseTypeFilter } from '../../type/ExpenseType';

type ExpenseUpsertDialogProps = {
  type: 'add' | 'edit';
  expense?: ExpenseItem;
  triggerContent?: React.ReactNode;
};

const disabledForm = (type: 'add' | 'edit', status: StatusType | undefined) => {
  return type === 'edit' && (status === 'Submitted' || status === 'Approved' || status === undefined);
};

export const ExpenseUpsertDialog = ({ type, expense, triggerContent }: ExpenseUpsertDialogProps) => {
  const [expenseType, setExpenseType] = useState<ExpenseTypeFilter>(expense?.expenseType || 'General');
  const { form, onSubmit, isSubmitted, fields, append, remove, resetToDefault } = useExpenseForm({
    type,
    expense,
  });
  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>{triggerContent}</DialogTrigger>
        <DialogContent className="w-full sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">経費申請</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-sm">交通費や一般経費の情報を申請します。</DialogDescription>
            <div className="space-y-6 pt-4">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">基本情報</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputSelectFormField
                      form={form}
                      name="expenseType"
                      label="経費種別"
                      placeholder="経費種別を選択"
                      options={[
                        { value: 'General', label: '一般経費' },
                        { value: 'Transport', label: '交通費' },
                      ]}
                      onValueChange={(value) => setExpenseType(value as ExpenseTypeFilter)}
                      required
                      disabled={disabledForm(type, expense?.statusCode)}
                    />
                    <InputCalendarFormField
                      form={form}
                      name="expenseDate"
                      label="発生日"
                      placeholder="日付を選択"
                      required
                      disabled={disabledForm(type, expense?.statusCode)}
                    />
                    <InputCalendarFormField
                      form={form}
                      name="requestDate"
                      label="申請日"
                      placeholder="日付を選択"
                      required
                      disabled={disabledForm(type, expense?.statusCode)}
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
                        disabled={disabledForm(type, expense?.statusCode)}
                      />
                    </div>
                  </div>
                </div>

                {expenseType === 'Transport' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                      <Train className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">経路情報</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                        <div className="space-y-4">
                          {fields.map((field, index) => (
                            <RouteFormItem
                              key={field.id}
                              index={index}
                              onRemove={() => remove(index)}
                              isRemovable={fields.length > 1}
                              disabled={disabledForm(type, expense?.statusCode)}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                          onClick={() => append({ from: '', to: '', fare: 0 })}
                          disabled={disabledForm(type, expense?.statusCode)}
                        >
                          <Plus className="h-4 w-4" />
                          <span>経路を追加</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

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
                      disabled={expenseType === 'Transport' || disabledForm(type, expense?.statusCode)}
                    />
                    <InputFileFormField
                      form={form}
                      name="receiptFile"
                      label="領収書"
                      existingFile={expense?.receiptUrl}
                      disabled={disabledForm(type, expense?.statusCode)}
                    />
                  </div>
                </div>
              </div>
              {!disabledForm(type, expense?.statusCode) && (
                <DialogFooter>
                  <DialogActionFooter resetToDefault={resetToDefault} disabled={isSubmitted} />
                </DialogFooter>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};
