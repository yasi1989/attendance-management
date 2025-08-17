import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import DialogActionFooter from '@/components/dialog/DialogActionFooter';
import { ExpenseItem } from '../../type/ExpenseType';
import { useExpenseForm } from '../hooks/useExpenseForm';
import { canPerformRequest } from '@/lib/status';
import { useDialogState } from '@/hooks/useDialogState';
import DialogHeaderWithClose from '@/components/dialog/DialogHeaderWithClose';
import { EXPENSE_CATEGORIES } from '@/consts/expense';
import { STATUS } from '@/consts/status';
import ExpenseBasicInfoField from './ExpenseBasicInfoField';
import ExpenseReimbursementField from './ExpenseReimbursementField';
import ExpenseTransportInfoField from './ExpenseTransportInfoField';

type ExpenseUpsertDialogProps = {
  expense?: ExpenseItem;
  triggerContent?: React.ReactNode;
};

export const ExpenseUpsertDialog = ({ expense, triggerContent }: ExpenseUpsertDialogProps) => {
  const isDisabled = !canPerformRequest(expense?.status || STATUS.PENDING.value);
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
  const isTransport = expenseType === EXPENSE_CATEGORIES.TRANSPORT.value;

  const { open, handleOpenChange, handleCloseButtonClick } = useDialogState({
    form,
  });

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
                  receiptUrl={expense?.receiptUrl}
                />
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
