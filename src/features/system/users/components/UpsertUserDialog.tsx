'use client';

import InputFormField from '@/components/form/InputFormField';
import { useUsers } from '../hooks/useUsers';
import InputSelectFormField from '@/components/form/InputSelectFormField';
import FormDialog, { DialogConfig } from '@/components/dialog/FormDialog';
import { EditButton } from '@/components/actionButton/EditButton';
import { useMemo } from 'react';
import { Company, Role } from '@/lib/actionTypes';
import { UserWithRelations } from '../type/fetchResultResponse';
import { VALIDATION_LIMITS } from '@/consts/validate';

type UpsertUserDialogProps = {
  user?: UserWithRelations;
  allCompanies?: Company[];
  allRoles?: Role[];
  children?: React.ReactNode;
};

export function UpsertUserDialog({ user, allCompanies, allRoles, children }: UpsertUserDialogProps) {
  const { form, onSubmit, isSubmitted } = useUsers({ user });
  const dialogConfig: DialogConfig = {
    title: 'ユーザ編集',
    description: 'ユーザの権限及び所属会社を編集します。',
    submitButtonLabel: '編集',
    cancelButtonLabel: 'キャンセル',
  };
  const roleOptions = useMemo(() => {
    return allRoles?.map((role) => ({ value: role.id, label: role.roleName })) || [];
  }, [allRoles]);
  const companyOptions = useMemo(() => {
    return allCompanies?.map((company) => ({ value: company.id, label: company.companyName })) || [];
  }, [allCompanies]);
  const formContent = (
    <div className="flex flex-col gap-4">
      <InputSelectFormField name="companyId" label="所属会社" form={form} options={companyOptions} />
      <InputFormField name="name" label="名前" form={form} maxLength={VALIDATION_LIMITS.NAME_MAX_LENGTH} required />
      <InputFormField name="email" label="メールアドレス" form={form} maxLength={VALIDATION_LIMITS.EMAIL_MAX_LENGTH} required />
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
