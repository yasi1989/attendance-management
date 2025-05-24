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
import { useCompanyCode } from '../hooks/useCompanyCode';
import { CompanyType } from '../type/companyType';

type CompanyCodeDialogProps = {
  type: 'add' | 'edit';
  data?: CompanyType;
  children: React.ReactNode;
};

export function CompanyCodeDialog({ type, data, children }: CompanyCodeDialogProps) {
  const { form, onSubmit, isPending } = useCompanyCode({ type, data });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{type === 'add' ? '会社コード登録' : '会社コード編集'}</DialogTitle>
              <DialogDescription>{`会社コードを${type === 'add' ? '登録' : '編集'}します。`}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <InputFormField name="code" label="会社コード" form={form} />
              <InputFormField name="name" label="会社名" form={form} />
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
