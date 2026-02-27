'use client';

import { EditButton } from '@/components/actionButton/EditButton';
import FormDialog, { DialogConfig } from '@/components/dialog/FormDialog';
import InputCalendarFormField from '@/components/form/InputCalendarFormField';
import InputFormField from '@/components/form/InputFormField';
import { FormMode } from '@/consts/formMode';
import { VALIDATIONS } from '@/consts/validate';
import { getFormModeName } from '@/lib/formMode';
import { useHoliday } from '../hooks/useHoliday';
import { HolidayDisplay } from '../type/holidaysDisplayType';

type UpsertHolidayDialogProps = {
  type: FormMode;
  data?: HolidayDisplay;
  children?: React.ReactNode;
};

export function UpsertHolidayDialog({ type, data, children }: UpsertHolidayDialogProps) {
  const { form, onSubmit, isSubmitted } = useHoliday({ type, data });
  const modeName = getFormModeName(type);
  const dialogConfig: DialogConfig = {
    title: `休日${modeName}`,
    description: `休日情報を${modeName}してください。`,
    submitButtonLabel: modeName,
  };
  const formContent = (
    <div className="flex flex-col gap-4">
      <InputFormField name="name" label="休日名" form={form} maxLength={VALIDATIONS.NAME_MAX_LENGTH} required />
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
