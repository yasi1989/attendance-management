import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { FORM_MODE } from '@/consts/formMode';
import { ERROR_MESSAGE } from '@/consts/validate';
import { PublicUser } from '@/lib/actionTypes';
import { deleteEmployeeAction, editEmployeeAction } from '../api/action';
import { EmployeeSchema } from '../lib/formSchema';

type UseEmployeeProps = {
  user: PublicUser;
};

export const useEmployee = ({ user }: UseEmployeeProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const form = useForm<z.infer<typeof EmployeeSchema>>({
    defaultValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      departmentId: user.departmentId,
      roleId: user.roleId,
    },
    resolver: zodResolver(EmployeeSchema),
  });
  const onSubmit = (data: z.infer<typeof EmployeeSchema>) => {
    startTransition(async () => {
      try {
        const { success, error } = await editEmployeeAction(data);
        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
        } else {
          toast.success(FORM_MODE.EDIT.label + 'に成功しました。');
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

export const useDeleteEmployee = (id: string) => {
  const [isSubmitted, startTransition] = useTransition();
  const onDelete = () => {
    startTransition(async () => {
      try {
        const { success, error } = await deleteEmployeeAction(id);
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
