'use client';
import InputFileFormField from '@/components/form/InputFileFormField';
import InputFormField from '@/components/form/InputFormField';
import { Button } from '@/components/ui/button';
import { VALIDATIONS } from '@/consts/validate';
import { NavUser } from '@/features/dashboard/types/type';
import BlobAvatar from '../../../components/layout/BlobAvatar';
import { useAccountForm } from '../hooks/useAccountForm';

type UpdateAccountProps = {
  navUser: NavUser;
};

export const UpdateAccount = ({ navUser }: UpdateAccountProps) => {
  const { form, onSubmit, isPending, resetToDefault } = useAccountForm({
    name: navUser.name,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-4">
        <BlobAvatar src={navUser.avatar} name={navUser.name} className="h-16 w-16 rounded-lg" />
        <div>
          <p className="font-medium">{navUser.name}</p>
          <p className="text-sm text-muted-foreground">{navUser.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <InputFormField
          name="name"
          label="アカウント名"
          form={form}
          maxLength={VALIDATIONS.NAME_MAX_LENGTH}
          required
          disabled={isPending}
        />
        <InputFileFormField name="avatarFile" label="アバター" form={form} disabled={isPending} />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={resetToDefault} disabled={isPending}>
          リセット
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? '更新中...' : '更新する'}
        </Button>
      </div>
    </form>
  );
};
