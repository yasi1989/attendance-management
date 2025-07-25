'use client';

import InputFormField from '@/components/InputFormField';
import { useUsers } from '../hooks/useUsers';
import { UserType } from '../type/userType';
import { CompanyType } from '../../company/type/companyType';
import { RoleType } from '../type/roleType';
import InputSelectFormField from '@/components/InputSelectFormField';
import CommonDialog, { DialogConfig } from '@/components/CommonDialog';

type UserEditDialogProps = {
  user?: UserType;
  companies?: CompanyType[];
  roles?: RoleType[];
  children: React.ReactNode;
};

export function UserEditDialog({ user, companies, roles, children }: UserEditDialogProps) {
  const { form, onSubmit, isPending } = useUsers({ user });
  const dialogConfig: DialogConfig = {
    title: 'ユーザ編集',
    description: 'ユーザの権限及び所属会社を編集します。',
    submitButtonLabel: '編集',
    cancelButtonLabel: 'キャンセル',
  };
  const formContent = (
    <div className="flex flex-col gap-4">
      <InputFormField name="lastName" label="姓" form={form} maxLength={20} required />
      <InputFormField name="firstName" label="名前" form={form} maxLength={20} required />
      <InputFormField name="email" label="メールアドレス" form={form} maxLength={255} required />
      <InputSelectFormField
        name="roleId"
        label="権限"
        form={form}
        data={roles?.map((role) => ({ value: role.id, label: role.roleName })) || []}
      />
      <InputSelectFormField
        name="companyId"
        label="所属会社"
        form={form}
        data={companies?.map((company) => ({ value: company.id, label: company.name })) || []}
      />
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
