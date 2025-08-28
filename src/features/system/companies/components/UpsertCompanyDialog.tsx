'use client';

import InputFormField from '@/components/form/InputFormField';
import { useCompany } from '../hooks/useCompany';
import FormDialog, { DialogConfig } from '@/components/dialog/FormDialog';
import { EditButton } from '@/components/actionButton/EditButton';
import { Company } from '@/lib/actionTypes';
import { FormMode } from '@/consts/formMode';
import { getFormModeName } from '@/lib/formMode';

type UpsertCompanyDialogProps = {
  type: FormMode;
  data?: Company;
  children?: React.ReactNode;
};

export function UpsertCompanyDialog({ type, data, children }: UpsertCompanyDialogProps) {
  const { form, onSubmit, isSubmitted } = useCompany({ type, data });
  const formModeName = getFormModeName(type);
  const dialogConfig: DialogConfig = {
    title: `会社${formModeName}`,
    description: `会社情報を${formModeName}してください。`,
    submitButtonLabel: formModeName,
  };
  const formContent = (
    <div className="flex flex-col gap-4">
      <input type="hidden" {...form.register('id')} />
      <InputFormField name="companyName" label="会社名" form={form} maxLength={100} required />
      <InputFormField name="domain" label="ドメイン" form={form} maxLength={255} required />
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
