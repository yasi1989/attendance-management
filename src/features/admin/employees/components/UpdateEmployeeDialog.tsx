'use client';

import { useMemo } from 'react';
import { EditButton } from '@/components/actionButton/EditButton';
import FormDialog, { DialogConfig } from '@/components/dialog/FormDialog';
import InputFormField from '@/components/form/InputFormField';
import InputSelectFormField from '@/components/form/InputSelectFormField';
import { VALIDATIONS } from '@/consts/validate';
import { Department, PublicUser, Role } from '@/lib/actionTypes';
import { useEmployee } from '../hooks/useEmployees';
import { getDepartmentPath } from '../lib/departmentUtils';

type UpsertEmployeeDialogProps = {
  user: PublicUser;
  departments: Department[];
  roles: Role[];
  children?: React.ReactNode;
};

export function UpdateEmployeeDialog({ user, departments, roles, children }: UpsertEmployeeDialogProps) {
  const { form, onSubmit, isSubmitted } = useEmployee({ user });
  const dialogConfig: DialogConfig = {
    title: '社員編集',
    description: '社員情報を更新してください。',
    submitButtonLabel: '更新',
  };
  const departmentOptions = useMemo(() => {
    return departments.map((d) => ({ value: d.id, label: getDepartmentPath(departments, d.id) }));
  }, [departments]);
  const roleOptions = useMemo(() => {
    return roles.map((d) => ({ value: d.id, label: d.roleName }));
  }, [roles]);
  const formContent = (
    <div className="flex flex-col gap-4">
      <InputFormField name="name" label="名前" form={form} maxLength={VALIDATIONS.NAME_MAX_LENGTH} required />
      <InputFormField
        name="email"
        label="メールアドレス"
        form={form}
        maxLength={VALIDATIONS.EMAIL_MAX_LENGTH}
        required
      />
      <InputSelectFormField name="departmentId" label="部署" form={form} options={departmentOptions} />
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
