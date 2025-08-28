import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Company } from '@/lib/actionTypes';
import { FORM_MODE, FormMode } from '@/consts/formMode';
import { addCompanyAction, deleteCompanyAction, editCompanyAction } from '../api/actions';
// cspell:disable-next-line
import { toast } from 'sonner';
import { ERROR_MESSAGE } from '@/consts/validate';
import { getFormModeName } from '@/lib/formMode';
import { AddCompanySchema, EditCompanySchema } from '../lib/formSchema';

type UseCompanyProps = {
  type: FormMode;
  data?: Company;
};

const actions = {
  add: addCompanyAction,
  edit: editCompanyAction,
};

export const useCompany = ({ type, data }: UseCompanyProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AddCompanySchema | typeof EditCompanySchema>>({
    defaultValues: {
      id: '',
      companyName: '',
      domain: '',
    },
    values: type === FORM_MODE.EDIT.value && data ? { ...data } : undefined,
    resolver: zodResolver(type === FORM_MODE.ADD.value ? AddCompanySchema : EditCompanySchema),
  });
  const onSubmit = (data: z.infer<typeof AddCompanySchema | typeof EditCompanySchema>) => {
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

export const useDeleteCompany = (id: string) => {
  const [isSubmitted, startTransition] = useTransition();
  const onDelete = () => {
    startTransition(async () => {
      try {
        const { success, error } = await deleteCompanyAction(id);
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
