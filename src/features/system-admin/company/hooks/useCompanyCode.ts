import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { CompanyCodeSchema } from '../lib/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompanyType } from '../type/companyType';

type UseCompanyCodeProps = {
  type: 'add' | 'edit';
  data?: CompanyType;
};

export const useCompanyCode = ({ type, data }: UseCompanyCodeProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CompanyCodeSchema>>({
    defaultValues:
      type === 'edit' && data
        ? {
            code: data.code,
            name: data.name,
          }
        : {
            code: '',
            name: '',
          },
    resolver: zodResolver(CompanyCodeSchema),
  });
  const onSubmit = (data: z.infer<typeof CompanyCodeSchema>) => {
    startTransition(() => {
      console.log(data);
    });
  };
  return { form, onSubmit, isPending };
};
