import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { CompanySchema } from '../lib/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompanyType } from '../type/companyType';

type UseCompanyProps = {
  type: 'add' | 'edit';
  data?: CompanyType;
};

export const useCompany = ({ type, data }: UseCompanyProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CompanySchema>>({
    defaultValues:
      type === 'edit' && data
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
  return { form, onSubmit, isPending };
};
