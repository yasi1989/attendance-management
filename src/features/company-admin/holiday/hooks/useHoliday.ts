import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { HolidaySchema } from '../lib/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HolidayType } from '../type/holidayType';

type UseHolidayProps = {
  type: 'add' | 'edit';
  data?: HolidayType;
};

export const useHoliday = ({ type, data }: UseHolidayProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof HolidaySchema>>({
    defaultValues:
      type === 'edit' && data
        ? {
            name: data.name,
            holidayDate: data.holidayDate,
          }
        : {
            name: '',
            holidayDate: new Date(),
          },
    resolver: zodResolver(HolidaySchema),
  });
  const onSubmit = (data: z.infer<typeof HolidaySchema>) => {
    startTransition(() => {
      console.log(data);
    });
  };
  return { form, onSubmit, isPending };
};
