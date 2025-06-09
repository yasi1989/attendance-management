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
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import InputSelectFormField from '@/components/InputSelectFormField';
import { useDepartments } from '../hooks/useDepartments';

type UpsertDepartmentDialogProps = {
  type: 'add' | 'edit';
  userDepartment?: DepartmentType;
  allDepartments: DepartmentType[];
  children: React.ReactNode;
};

export function UpsertDepartmentDialog({
  type,
  userDepartment,
  allDepartments,
  children,
}: UpsertDepartmentDialogProps) {
  const { form, onSubmit, isPending } = useDepartments({ type, userDepartment });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{userDepartment ? '部署編集' : '部署登録'}</DialogTitle>
              <DialogDescription>{`部署を${userDepartment ? '編集' : '登録'}します。`}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <InputFormField name="departmentCode" label="部署コード" form={form} required />
              <InputFormField name="departmentName" label="部署名" form={form} required />
              <InputSelectFormField
                name="parentDepartmentId"
                label="親部署"
                form={form}
                options={allDepartments.map((d) => ({ value: d.id, label: d.departmentName }))}
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
