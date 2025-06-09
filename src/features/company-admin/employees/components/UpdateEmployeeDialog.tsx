'use client';

import InputFormField from '@/components/InputFormField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useEmployee } from '../hooks/useEmployees';
import InputSelectFormField from '@/components/InputSelectFormField';
import { UserType } from '@/features/system-admin/users/type/userType';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { RoleType } from '@/features/system-admin/users/type/roleType';
import { getDepartmentPath } from '../lib/departmentUtils';

type UpsertEmployeeDialogProps = {
  type: 'add' | 'edit';
  user?: UserType;
  departments: DepartmentType[];
  roles: RoleType[];
  children: React.ReactNode;
};

export function UpsertEmployeeDialog({ type, user, departments, roles, children }: UpsertEmployeeDialogProps) {
  const { form, onSubmit, isPending } = useEmployee({ type, user });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{user ? '社員編集' : '社員登録'}</DialogTitle>
              <DialogDescription>{`社員を${user ? '編集' : '登録'}します。`}</DialogDescription>
            </DialogHeader>
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
            <DialogFooter>
              <Button variant="outline">キャンセル</Button>
              <Button type="submit" disabled={isPending}>
                {type === 'add' ? '登録' : '編集'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
