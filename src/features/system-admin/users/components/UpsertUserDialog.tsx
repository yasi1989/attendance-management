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
import { useUsers } from '../hooks/useUsers';
import { UserType } from '../type/userType';
import { CompanyType } from '../../company/type/companyType';
import { RoleType } from '../type/roleType';
import InputSelectFormField from '@/components/InputSelectFormField';

type UserEditDialogProps = {
  user?: UserType;
  companies?: CompanyType[];
  roles?: RoleType[];
  children: React.ReactNode;
};

export function UserEditDialog({ user, companies, roles, children }: UserEditDialogProps) {
  const { form, onSubmit, isPending } = useUsers({ user });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>ユーザ編集画面</DialogTitle>
              <DialogDescription>ユーザの権限及び所属会社を編集します。</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <InputFormField name="lastName" label="姓" form={form} maxLength={20} />
              <InputFormField name="firstName" label="名前" form={form} maxLength={20} />
              <InputSelectFormField
                name="roleId"
                label="権限"
                form={form}
                options={roles?.map((role) => ({ value: role.id, label: role.roleName })) || []}
              />
              <InputSelectFormField
                name="companyId"
                label="所属会社"
                form={form}
                options={companies?.map((company) => ({ value: company.id, label: company.name })) || []}
              />
            </div>
            <DialogFooter>
              <Button variant="outline">キャンセル</Button>
              <Button type="submit" disabled={isPending}>
                編集
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
