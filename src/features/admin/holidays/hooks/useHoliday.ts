import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
// cspell:disable-next-line
import { toast } from 'sonner';
import { z } from 'zod';
import { FORM_MODE, FormMode } from '@/consts/formMode';
import { ERROR_MESSAGE } from '@/consts/validate';
import { Holiday } from '@/lib/actionTypes';
import { getFormModeName } from '@/lib/formMode';
import { addHolidayAction, editHolidayAction } from '../api/actions';
import { HolidaySchema } from '../lib/formSchema';

type UseHolidayProps = {
  type: FormMode;
  data?: Holiday;
};

const actions = {
  add: addHolidayAction,
  edit: editHolidayAction,
};

export const useHoliday = ({ type, data }: UseHolidayProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const form = useForm<z.infer<typeof HolidaySchema>>({
    defaultValues: {
      id: '',
      name: '',
      holidayDate: new Date(),
    },
    values: type === FORM_MODE.EDIT.value && data ? { ...data } : undefined,
    resolver: zodResolver(HolidaySchema),
  });
  const onSubmit = (data: z.infer<typeof HolidaySchema>) => {
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
