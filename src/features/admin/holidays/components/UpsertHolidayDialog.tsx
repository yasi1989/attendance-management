'use client';

import InputFormField from '@/components/form/InputFormField';
import { HolidayType } from '../type/holidayType';
import InputCalendarFormField from '@/components/form/InputCalendarFormField';
import { useHoliday } from '../hooks/useHoliday';
import FormDialog, { DialogConfig } from '@/components/dialog/FormDialog';
import { EditButton } from '@/components/actionButton/EditButton';

type UpsertHolidayDialogProps = {
  type: 'add' | 'edit';
  data?: HolidayType;
  children?: React.ReactNode;
};

export function UpsertHolidayDialog({ type, data, children }: UpsertHolidayDialogProps) {
  const { form, onSubmit, isSubmitted } = useHoliday({ type, data });
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
  const triggerButton = children || <EditButton />;
  return (
    <FormDialog
      config={dialogConfig}
      form={form}
      onSubmit={onSubmit}
      isSubmitted={isSubmitted}
      trigger={triggerButton}
      formContent={formContent}
    />
  );
}
