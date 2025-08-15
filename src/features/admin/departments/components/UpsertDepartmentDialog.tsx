'use client';

import InputFormField from '@/components/form/InputFormField';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import InputSelectFormField from '@/components/form/InputSelectFormField';
import { useDepartments } from '../hooks/useDepartments';
import { UserType } from '@/features/system/users/type/userType';
import { EditButton } from '@/components/actionButton/EditButton';
import { useMemo } from 'react';
import FormDialog, { DialogConfig } from '@/components/dialog/FormDialog';

type UpsertDepartmentDialogProps = {
  type: 'add' | 'edit';
  userDepartment?: DepartmentType;
  allDepartments: DepartmentType[];
  users: UserType[];
  children?: React.ReactNode;
};

export function UpsertDepartmentDialog({
  type,
  userDepartment,
  allDepartments,
  users,
  children,
}: UpsertDepartmentDialogProps) {
  const { form, onSubmit, isSubmitted } = useDepartments({ type, userDepartment });
  const dialogConfig: DialogConfig = {
    title: type === 'add' ? '部署・役職登録' : '部署・役職編集',
    description: `部署・役職情報を${type === 'add' ? '登録' : '更新'}してください。`,
    submitButtonLabel: type === 'add' ? '登録' : '更新',
    cancelButtonLabel: 'キャンセル',
  };
  const companyOptions = useMemo(() => {
    return allDepartments.map((d) => ({ value: d.id, label: d.departmentName }));
  }, [allDepartments]);
  const userOptions = useMemo(() => {
    return users.map((d) => ({ value: d.id, label: `${d.firstName} ${d.lastName}` }));
  }, [users]);
  const formContent = (
    <div className="flex flex-col gap-4">
      <InputFormField name="departmentName" label="部署名" form={form} required maxLength={100} />
      <InputSelectFormField name="parentDepartmentId" label="親部署" form={form} options={companyOptions} />
      <InputSelectFormField name="managerUserId" label="部門責任者" form={form} options={userOptions} />
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
