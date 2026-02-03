import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { FORM_MODE, FormMode } from '@/consts/formMode';
import { ERROR_MESSAGE } from '@/consts/validate';
import { Department } from '@/lib/actionTypes';
import { getFormModeName } from '@/lib/formMode';
import { addDepartmentAction, deleteDepartmentAction, editDepartmentAction } from '../api/action';
import { DepartmentSchema } from '../lib/formSchema';

type UseDepartmentsProps = {
  type: FormMode;
  userDepartment?: Department;
};

const actions = {
  add: addDepartmentAction,
  edit: editDepartmentAction,
};

export const useDepartments = ({ type, userDepartment }: UseDepartmentsProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const form = useForm<z.infer<typeof DepartmentSchema>>({
    defaultValues: {
      id: '',
      departmentName: '',
      parentDepartmentId: '',
      managerUserId: '',
    },
    values: type === FORM_MODE.EDIT.value && userDepartment ? { ...userDepartment } : undefined,
    resolver: zodResolver(DepartmentSchema),
  });
  const onSubmit = (data: z.infer<typeof DepartmentSchema>) => {
    startTransition(async () => {
      try {
        const { success, error } = await actions[type](data);
        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
        } else {
          toast.success(getFormModeName(type) + 'に成功しました。');
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

export const useDeleteDepartment = (id: string) => {
  const [isSubmitted, startTransition] = useTransition();
  const onDelete = () => {
    startTransition(async () => {
      try {
        const { success, error } = await deleteDepartmentAction(id);
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
