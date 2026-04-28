import { FormProvider } from 'react-hook-form';
import DialogActionFooter from '@/components/dialog/DialogActionFooter';
import DialogHeaderWithClose from '@/components/dialog/DialogHeaderWithClose';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { EXPENSE_CATEGORIES } from '@/consts/expense';
import { STATUS } from '@/consts/status';
import { useDialogState } from '@/hooks/useDialogState';
import { ExpenseWithApproval } from '@/lib/actionTypes';
import { canPerformRequest } from '@/lib/status';
import { useExpenseForm } from '../hooks/useExpenseForm';
import ExpenseBasicInfoField from './ExpenseBasicInfoField';
import ExpenseReimbursementField from './ExpenseReimbursementField';
import ExpenseTransportInfoField from './ExpenseTransportInfoField';

type ExpenseUpsertDialogProps = {
  expense?: ExpenseWithApproval;
  triggerContent?: React.ReactNode;
};

export const ExpenseUpsertDialog = ({ expense, triggerContent }: ExpenseUpsertDialogProps) => {
  const status = expense?.groupExpenseApproval?.statusCode ?? STATUS.PENDING.value;
  const isDisabled = !canPerformRequest(status);

  const { open, handleOpenChange, handleCloseButtonClick } = useDialogState();

  const {
    form,
    onSubmit,
    isPending,
    fields,
    handleAddRoute,
    handleRemoveRoute,
    expenseType,
    handleExpenseTypeChange,
    resetToDefault,
  } = useExpenseForm({ expense, onSuccess: handleCloseButtonClick });

  const isTransport = expenseType === EXPENSE_CATEGORIES.TRANSPORT.value;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>
      <DialogContent className="[&>button]:hidden w-full sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeaderWithClose title="経費申請" onClose={handleCloseButtonClick} />
            <DialogDescription className="text-sm">交通費や一般経費の情報を申請します。</DialogDescription>

            <div className="space-y-6 pt-4">
              <div className="space-y-8">
                <ExpenseBasicInfoField
                  form={form}
                  isDisabled={isDisabled}
                  handleExpenseTypeChange={handleExpenseTypeChange}
                />

                {isTransport && (
                  <ExpenseTransportInfoField
                    fields={fields}
                    handleAddRoute={handleAddRoute}
                    handleRemoveRoute={handleRemoveRoute}
                    isDisabled={isDisabled}
                  />
                )}

                <ExpenseReimbursementField
                  form={form}
                  isDisabled={isDisabled}
                  isTransport={isTransport}
                  receiptUrl={expense?.receiptUrl ?? undefined}
                />
              </div>

              {!isDisabled && (
                <DialogFooter>
                  <DialogActionFooter resetToDefault={resetToDefault} isPending={isPending} />
                </DialogFooter>
              )}
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
