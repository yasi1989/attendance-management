'use client';

import InputFormField from '@/components/form/InputFormField';
import { useCompany } from '../hooks/useCompany';
import { CompanyType } from '../type/companyType';
import FormDialog, { DialogConfig } from '@/components/dialog/FormDialog';
import { EditButton } from '@/components/actionButton/EditButton';

type UpsertCompanyDialogProps = {
  type: 'add' | 'edit';
  data?: CompanyType;
  children?: React.ReactNode;
};

export function UpsertCompanyDialog({ type, data, children }: UpsertCompanyDialogProps) {
  const { form, onSubmit, isSubmitted } = useCompany({ type, data });
  const dialogConfig: DialogConfig = {
    title: type === 'add' ? '会社登録' : '会社編集',
    description: `会社情報を${type === 'add' ? '登録' : '更新'}してください。`,
    submitButtonLabel: type === 'add' ? '登録' : '更新',
    cancelButtonLabel: 'キャンセル',
  };
  const formContent = (
    <div className="flex flex-col gap-4">
      <InputFormField name="name" label="会社名" form={form} maxLength={100} required />
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
