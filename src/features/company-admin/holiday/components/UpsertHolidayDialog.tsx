'use client';

import InputFormField from '@/components/InputFormField';
import { HolidayType } from '../type/holidayType';
import InputCalendarFormField from '@/components/InputCalendarFormField';
import { useHoliday } from '../hooks/useHoliday';
import CommonDialog, { DialogConfig } from '@/components/CommonDialog';

type UpsertHolidayDialogProps = {
  type: 'add' | 'edit';
  data?: HolidayType;
  children: React.ReactNode;
};

export function UpsertHolidayDialog({ type, data, children }: UpsertHolidayDialogProps) {
  const { form, onSubmit, isPending } = useHoliday({ type, data });
  const dialogConfig: DialogConfig = {
    title: type === 'add' ? '休日登録' : '休日編集',
    description: `休日情報を${type === 'add' ? '登録' : '更新'}してください。`,
    submitButtonLabel: type === 'add' ? '登録' : '更新',
    cancelButtonLabel: 'キャンセル',
  };
  const formContent = (
    <div className="flex flex-col gap-4">
      <InputFormField name="name" label="休日名" form={form} maxLength={100} required />
      <InputCalendarFormField name="holidayDate" label="日付" form={form} required />
    </div>
  );
  return (
    <CommonDialog
      config={dialogConfig}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      trigger={children}
      formContent={formContent}
    />
  );
}
