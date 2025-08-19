import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { CompanySchema } from '../lib/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Company, UpsertStateResult } from '@/lib/db/types';
import { FORM_MODE, FormMode } from '@/consts/formMode';
import { addCompanyAction, editCompanyAction } from '../api/actions';
// cspell:disable-next-line
import { toast } from 'sonner';
import { handleError } from '@/lib/actionErrorHandler';

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
  const form = useForm<z.infer<typeof CompanySchema>>({
    defaultValues:
      type === FORM_MODE.EDIT && data
        ? {
            id: data.id,
            companyName: data.companyName,
            domain: data.domain,
          }
        : {
            id: '',
            companyName: '',
            domain: '',
          },
    resolver: zodResolver(CompanySchema),
  });
  const onSubmit = (data: z.infer<typeof CompanySchema>) => {
    startTransition(async () => {
      try {
        
      const result: UpsertStateResult = await actions[type](data);
      if (!result.success) {
        toast.error(result.error);
        form.reset();
        return;
      }
      toast.success(type === FORM_MODE.ADD ? 'テナント登録に成功しました。' : 'テナント更新に成功しました。');
      return;
    } catch (error) {
      const result = handleError(error);
      toast.error('テナント登録に失敗しました。');
    }
    });
  };
  return { form, onSubmit, isSubmitted };
};
