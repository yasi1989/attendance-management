'use client';

import InputFormField from '@/components/form/InputFormField';
import InputCalendarFormField from '@/components/form/InputCalendarFormField';
import { useHoliday } from '../hooks/useHoliday';
import FormDialog, { DialogConfig } from '@/components/dialog/FormDialog';
import { EditButton } from '@/components/actionButton/EditButton';
import { FormMode } from '@/consts/formMode';
import { getFormModeName } from '@/lib/formMode';
import { Holiday } from '@/lib/actionTypes';
import { VALIDATION_LIMITS } from '@/consts/validate';

type UpsertHolidayDialogProps = {
  type: FormMode;
  data?: Holiday;
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
      <InputFormField name="name" label="休日名" form={form} maxLength={VALIDATION_LIMITS.NAME_MAX_LENGTH} required />
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
