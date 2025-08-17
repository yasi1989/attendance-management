import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { CompanySchema } from '../lib/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Company } from '@/lib/db/types';

type UseCompanyProps = {
  type: 'add' | 'edit';
  data?: Company;
};

export const useCompany = ({ type, data }: UseCompanyProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CompanySchema>>({
    defaultValues:
      type === 'edit' && data
        ? {
            companyName: data.companyName,
            domain: data.domain,
          }
        : {
            companyName: '',
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
