'use client';

import InputFormField from '@/components/InputFormField';
import { useCompany } from '../hooks/useCompany';
import { CompanyType } from '../type/companyType';
import CommonDialog from '@/components/CommonDialog';

type UpsertCompanyDialogProps = {
  type: 'add' | 'edit';
  data?: CompanyType;
  children: React.ReactNode;
};

export function UpsertCompanyDialog({ type, data, children }: UpsertCompanyDialogProps) {
  const { form, onSubmit, isPending } = useCompany({ type, data });
  const dialogConfig = {
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
