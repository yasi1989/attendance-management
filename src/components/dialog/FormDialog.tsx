'use client';

import { Form } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import DialogHeaderWithClose from './DialogHeaderWithClose';
import { useDialogState } from '@/hooks/useDialogState';

export type DialogConfig = {
  title: string;
  description: string;
  submitButtonLabel: string;
  cancelButtonLabel?: string;
};

type FormDialogProps<TFormData extends FieldValues> = {
  config: DialogConfig;
  form: UseFormReturn<TFormData>;
  onSubmit: (data: TFormData) => void;
  isSubmitted?: boolean;
  trigger: React.ReactNode;
  formContent: React.ReactNode;
};

const FormDialog = <TFormData extends FieldValues>({
  config,
  form,
  onSubmit,
  isSubmitted,
  trigger,
  formContent,
}: FormDialogProps<TFormData>) => {
  const { open, handleOpenChange, handleCloseButtonClick } = useDialogState({
    form,
  });

  const handleSubmit = (data: TFormData) => {
    onSubmit(data);
    handleCloseButtonClick();
  };

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] [&>button]:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div>
              <DialogHeaderWithClose title={config.title} isCloseButtonVisible={false} />
              <DialogDescription>{config.description}</DialogDescription>
            </div>

            <div className="py-2">{formContent}</div>

            <DialogFooter className="gap-3 pt-4 border-t border-slate-200/30 dark:border-slate-700/30">
              <Button
                type="button"
                onClick={handleCloseButtonClick}
                className="bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 dark:from-slate-800 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-600 text-slate-600 dark:text-slate-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm transition-all duration-200 font-medium"
              >
                {config.cancelButtonLabel || 'キャンセル'}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitted}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm transition-all duration-200 font-medium"
              >
                {config.submitButtonLabel}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default FormDialog;
