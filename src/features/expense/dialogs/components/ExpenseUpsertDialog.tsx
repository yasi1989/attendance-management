import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Banknote, Calendar, Plus, Train, Lock } from 'lucide-react';
import InputTextFormField from '@/components/form/InputTextFormField';
import InputCalendarFormField from '@/components/form/InputCalendarFormField';
import { RouteFormItem } from './RouteFormItem';
import InputFormField from '@/components/form/InputFormField';
import InputFileFormField from '@/components/form/InputFileFormField';
import InputSelectFormField from '@/components/form/InputSelectFormField';
import DialogActionFooter from '@/components/dialog/DialogActionFooter';
import { Button } from '@/components/ui/button';
import { ExpenseItem } from '../../type/ExpenseType';
import { useExpenseForm } from '../hooks/useExpenseForm';
import { canPerformRequest } from '@/lib/status';
import { useDialogState } from '@/hooks/useDialogState';
import DialogHeaderWithClose from '@/components/dialog/DialogHeaderWithClose';
import { EXPENSE_CATEGORIES } from '@/consts/expense';
import { useMemo } from 'react';

type ExpenseUpsertDialogProps = {
  expense?: ExpenseItem;
  triggerContent?: React.ReactNode;
};

export const ExpenseUpsertDialog = ({ expense, triggerContent }: ExpenseUpsertDialogProps) => {
  const isDisabled = !canPerformRequest(expense?.status || '');
  const {
    form,
    onSubmit,
    isSubmitted,
    fields,
    handleAddRoute,
    handleRemoveRoute,
    expenseType,
    handleExpenseTypeChange,
    resetToDefault,
  } = useExpenseForm({ expense });

  const { open, handleOpenChange, handleCloseButtonClick } = useDialogState({
    form,
  });

  const expenseTypeOptions = useMemo(() => {
    return Object.values(EXPENSE_CATEGORIES).map((category) => ({
      value: category.value,
      label: category.label,
    }));
  }, []);

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{triggerContent}</DialogTrigger>
        <DialogContent className="[&>button]:hidden w-full sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeaderWithClose title="経費申請" onClose={handleCloseButtonClick} />
            <DialogDescription className="text-sm">交通費や一般経費の情報を申請します。</DialogDescription>

            <div className="space-y-6 pt-4">
              <div className="space-y-8">
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
                              onRemove={() => handleRemoveRoute(index)}
                              isRemovable={fields.length > 1}
                              disabled={isDisabled}
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
                          onClick={handleAddRoute}
                          disabled={isDisabled}
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
                      disabled={expenseType === 'Transport' || isDisabled}
                    />
                    <InputFileFormField
                      form={form}
                      name="receiptFile"
                      label="領収書"
                      existingFile={expense?.receiptUrl}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              </div>

              {!isDisabled && (
                <DialogFooter>
                  <DialogActionFooter resetToDefault={resetToDefault} isPending={isSubmitted} />
                </DialogFooter>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};
