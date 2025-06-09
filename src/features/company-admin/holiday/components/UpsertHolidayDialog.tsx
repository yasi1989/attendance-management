'use client';

import InputFormField from '@/components/InputFormField';
import { Button } from '@/components/ui/button';
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
import { HolidayType } from '../type/holidayType';
import InputCalendarFormField from '@/components/InputCalendarFormField';
import { useHoliday } from '../hooks/useHoliday';

type UpsertHolidayDialogProps = {
  type: 'add' | 'edit';
  data?: HolidayType;
  children: React.ReactNode;
};

export function UpsertHolidayDialog({ type, data, children }: UpsertHolidayDialogProps) {
  const { form, onSubmit, isPending } = useHoliday({ type, data });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{type === 'add' ? '休日登録' : '休日編集'}</DialogTitle>
              <DialogDescription>{`休日を${type === 'add' ? '登録' : '編集'}します。`}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <InputFormField name="name" label="休日名" form={form} maxLength={100} required />
              <InputCalendarFormField name="holidayDate" label="日付" form={form} required />
            </div>
            <DialogFooter>
              <Button variant="outline">キャンセル</Button>
              <Button type="submit" disabled={isPending}>
                {type === 'add' ? '登録' : '編集'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
