import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FORM_MODE, FormMode } from '@/consts/formMode';
import { HolidaySchema } from '../lib/formSchema';
import { HolidayType } from '../type/holidayType';

type UseHolidayProps = {
  type: FormMode;
  data?: HolidayType;
};

export const useHoliday = ({ type, data }: UseHolidayProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const form = useForm<z.infer<typeof HolidaySchema>>({
    defaultValues:
      type === FORM_MODE.EDIT.value && data
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
  return { form, onSubmit, isSubmitted };
};
