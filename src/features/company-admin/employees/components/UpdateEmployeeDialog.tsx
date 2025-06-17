'use client';

import InputFormField from '@/components/InputFormField';
import { useEmployee } from '../hooks/useEmployees';
import InputSelectFormField from '@/components/InputSelectFormField';
import { UserType } from '@/features/system-admin/users/type/userType';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { RoleType } from '@/features/system-admin/users/type/roleType';
import { getDepartmentPath } from '../lib/departmentUtils';
import CommonDialog, { DialogConfig } from '@/components/CommonDialog';

type UpsertEmployeeDialogProps = {
  user: UserType;
  departments: DepartmentType[];
  roles: RoleType[];
  children: React.ReactNode;
};

export function UpdateEmployeeDialog({ user, departments, roles, children }: UpsertEmployeeDialogProps) {
  const { form, onSubmit, isPending } = useEmployee({ user });
  const dialogConfig: DialogConfig = {
    title: '社員編集',
    description: '社員情報を更新してください。',
    submitButtonLabel: '更新',
    cancelButtonLabel: 'キャンセル',
  };
  const formContent = (
    <div className="flex flex-col gap-4">
      <InputFormField name="lastName" label="姓" form={form} maxLength={20} required />
      <InputFormField name="firstName" label="名" form={form} maxLength={20} required />
      <InputFormField name="email" label="メールアドレス" form={form} maxLength={255} required />
      <InputSelectFormField
        name="departmentId"
        label="部署"
        form={form}
        options={departments.map((d) => ({ value: d.id, label: getDepartmentPath(departments, d.id) }))}
      />
      <InputSelectFormField
        name="roleId"
        label="権限"
        form={form}
        options={roles.map((d) => ({ value: d.id, label: d.roleName }))}
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
