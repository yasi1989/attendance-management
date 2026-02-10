import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
// cspell:disable-next-line
import { toast } from 'sonner';
import { z } from 'zod';
import { ERROR_MESSAGE } from '@/consts/validate';
import { deleteUserAction, editUserAction } from '../api/actions';
import { UserSchema } from '../lib/formSchema';
import { UserWithRelations } from '../type/fetchResultResponse';

type UseUsersProps = {
  user?: UserWithRelations;
};

export const useUsers = ({ user }: UseUsersProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const form = useForm<z.infer<typeof UserSchema>>({
    defaultValues: {
      id: '',
      name: '',
      email: '',
      roleId: '',
      companyId: '',
    },
    values: user ? { ...user } : undefined,
    resolver: zodResolver(UserSchema),
  });
  const onSubmit = (data: z.infer<typeof UserSchema>) => {
    startTransition(async () => {
      try {
        const { success, error } = await editUserAction(data);
        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
        } else {
          toast.success('更新に成功しました。');
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${ERROR_MESSAGE.UNEXPECTED_ERROR}: ${error}`);
        } else {
          toast.error(ERROR_MESSAGE.SYSTEM_ERROR);
        }
      }
    });
  };
  return { form, onSubmit, isSubmitted };
};

export const useDeleteUser = (id: string) => {
  const [isSubmitted, startTransition] = useTransition();
  const onDelete = () => {
    startTransition(async () => {
      try {
        const { success, error } = await deleteUserAction(id);
        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
        } else {
          toast.success('削除に成功しました。');
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${ERROR_MESSAGE.UNEXPECTED_ERROR}: ${error}`);
        } else {
          toast.error(ERROR_MESSAGE.SYSTEM_ERROR);
        }
      }
    });
  };
  return { onDelete, isSubmitted };
};
