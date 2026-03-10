'use client';

import { useMemo } from 'react';
import { EditButton } from '@/components/actionButton/EditButton';
import FormDialog, { DialogConfig } from '@/components/dialog/FormDialog';
import InputFormField from '@/components/form/InputFormField';
import InputSelectFormField from '@/components/form/InputSelectFormField';
import { SELECT_EMPTY } from '@/consts/form';
import { FormMode } from '@/consts/formMode';
import { VALIDATIONS } from '@/consts/validate';
import { Department, PublicUser } from '@/lib/actionTypes';
import { getFormModeName } from '@/lib/formMode';
import { useDepartments } from '../hooks/useDepartments';

type UpsertDepartmentDialogProps = {
  type: FormMode;
  userDepartment?: Department;
  allDepartments: Department[];
  users: PublicUser[];
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
  const modeName = getFormModeName(type);
  const dialogConfig: DialogConfig = {
    title: `部署・役職${modeName}`,
    description: `部署・役職情報を${modeName}してください。`,
    submitButtonLabel: modeName,
  };
  const companyOptions = useMemo(() => {
    return [SELECT_EMPTY, ...allDepartments.map((d) => ({ value: d.id, label: d.departmentName }))];
  }, [allDepartments]);
  const userOptions = useMemo(() => {
    return [SELECT_EMPTY, ...users.map((d) => ({ value: d.id, label: d.name }))];
  }, [users]);
  const formContent = (
    <div className="flex flex-col gap-4">
      <InputFormField
        name="departmentName"
        label="部署名"
        form={form}
        required
        maxLength={VALIDATIONS.NAME_MAX_LENGTH}
      />
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
