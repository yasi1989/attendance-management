'use client';

import { useMemo } from 'react';
import { EditButton } from '@/components/actionButton/EditButton';
import FormDialog, { DialogConfig } from '@/components/dialog/FormDialog';
import InputFormField from '@/components/form/InputFormField';
import InputSelectFormField from '@/components/form/InputSelectFormField';
import { VALIDATION_LIMITS } from '@/consts/validate';
import { Company, Role } from '@/lib/actionTypes';
import { useUsers } from '../hooks/useUsers';
import { UserWithRelations } from '../type/fetchResultResponse';

type UpsertUserDialogProps = {
  user?: UserWithRelations;
  companies?: Company[];
  roles?: Role[];
  children?: React.ReactNode;
};

export function UpsertUserDialog({ user, companies, roles, children }: UpsertUserDialogProps) {
  const { form, onSubmit, isSubmitted } = useUsers({ user });
  const dialogConfig: DialogConfig = {
    title: 'ユーザ編集',
    description: 'ユーザの権限及び所属会社を編集します。',
    submitButtonLabel: '編集',
    cancelButtonLabel: 'キャンセル',
  };
  const roleOptions = useMemo(() => {
    return roles?.map((role) => ({ value: role.id, label: role.roleName })) || [];
  }, [roles]);
  const companyOptions = useMemo(() => {
    return companies?.map((company) => ({ value: company.id, label: company.companyName })) || [];
  }, [companies]);
  const formContent = (
    <div className="flex flex-col gap-4">
      <InputSelectFormField name="companyId" label="所属会社" form={form} options={companyOptions} />
      <InputFormField name="name" label="名前" form={form} maxLength={VALIDATION_LIMITS.NAME_MAX_LENGTH} required />
      <InputFormField
        name="email"
        label="メールアドレス"
        form={form}
        maxLength={VALIDATION_LIMITS.EMAIL_MAX_LENGTH}
        required
      />
      <InputSelectFormField name="roleId" label="権限" form={form} options={roleOptions} />
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
