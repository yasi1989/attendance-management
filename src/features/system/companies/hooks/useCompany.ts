import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { CompanySchema } from '../lib/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompanyType } from '../type/companyType';
import { FORM_MODE, FormMode } from '@/consts/formMode';

type UseCompanyProps = {
  type: FormMode;
  data?: CompanyType;
};

export const useCompany = ({ type, data }: UseCompanyProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CompanySchema>>({
    defaultValues:
      type === FORM_MODE.EDIT && data
        ? {
            name: data.name,
            domain: data.domain,
          }
        : {
            name: '',
            domain: '',
          },
    resolver: zodResolver(CompanySchema),
  });
  const onSubmit = (data: z.infer<typeof CompanySchema>) => {
    startTransition(() => {
      console.log(data);
    });
  };
  return { form, onSubmit, isSubmitted };
};
