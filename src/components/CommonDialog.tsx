'use client';

import { Form } from '@/components/ui/form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FieldValues, UseFormReturn } from 'react-hook-form';

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
  isPending?: boolean;
  trigger: React.ReactNode;
  formContent: React.ReactNode;
};

const CommonDialog = <TFormData extends FieldValues>({
  config,
  form,
  onSubmit,
  isPending,
  trigger,
  formContent,
}: CommonDialogProps<TFormData>) => {
  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{config.title}</DialogTitle>
              <DialogDescription>{config.description}</DialogDescription>
            </DialogHeader>
            {formContent}
            <DialogFooter>
              {config.cancelButtonLabel && (
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => form.reset()}>
                    {config.cancelButtonLabel}
                  </Button>
                </DialogClose>
              )}
              <Button type="submit" disabled={isPending}>
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