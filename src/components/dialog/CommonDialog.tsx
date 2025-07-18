'use client';

import { Form } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useState } from 'react';

export type DialogConfig = {
  title: string;
  description: string;
  submitButtonLabel: string;
  cancelButtonLabel?: string;
};

type CommonDialogProps<TFormData extends FieldValues> = {
  config: DialogConfig;
  form: UseFormReturn<TFormData>;
  onSubmit: (data: TFormData) => void;
  isSubmitted?: boolean;
  trigger: React.ReactNode;
  formContent: React.ReactNode;
  preventOutsideClick?: boolean;
};

const CommonDialog = <TFormData extends FieldValues>({
  config,
  form,
  onSubmit,
  isSubmitted,
  trigger,
  formContent,
  preventOutsideClick = true,
}: CommonDialogProps<TFormData>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (preventOutsideClick && !open) {
      return;
    }
    setIsOpen(open);
  };

  const handleCancel = () => {
    form.reset();
    setIsOpen(false);
  };

  const handleSubmit = (data: TFormData) => {
    onSubmit(data);
    setIsOpen(false);
  };

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild onClick={() => setIsOpen(true)}>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] [&>button]:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {config.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {config.description}
              </DialogDescription>
            </DialogHeader>

            <div className="py-2">{formContent}</div>

            <DialogFooter className="gap-3 pt-4 border-t border-slate-200/30 dark:border-slate-700/30">
              {config.cancelButtonLabel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="bg-white/80 dark:bg-slate-800/80 border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-50/90 dark:hover:bg-slate-700/90 hover:border-slate-300/50 dark:hover:border-slate-600/50 backdrop-blur-sm transition-all duration-200"
                >
                  {config.cancelButtonLabel}
                </Button>
              )}
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

export default CommonDialog;
