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
import { useCompany } from '../hooks/useCompany';
import { CompanyType } from '../type/companyType';

type UpsertCompanyDialogProps = {
  type: 'add' | 'edit';
  data?: CompanyType;
  children: React.ReactNode;
};

export function UpsertCompanyDialog({ type, data, children }: UpsertCompanyDialogProps) {
  const { form, onSubmit, isPending } = useCompany({ type, data });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{type === 'add' ? '会社登録' : '会社編集'}</DialogTitle>
              <DialogDescription>{`会社を${type === 'add' ? '登録' : '編集'}します。`}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <InputFormField name="name" label="会社名" form={form} maxLength={100} required />
              <InputFormField name="domain" label="ドメイン" form={form} maxLength={255} required />
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
