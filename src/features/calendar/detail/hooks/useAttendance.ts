import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AttendanceFormSchema } from '@/features/calendar/detail/lib/formSchema';
import { z } from 'zod';
import { useTransition } from 'react';
import { parseISOStringToDate } from '@/lib/dateFormatter';

export const useAttendance = (dateString: string) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AttendanceFormSchema>>({
    resolver: zodResolver(AttendanceFormSchema),
    defaultValues: {
      date: parseISOStringToDate(dateString),
      attendanceType: 'WORK',
      isHalfDay: false,
      halfDayType: 'AM',
      check_in: undefined,
      check_out: undefined,
      rest: undefined,
      comment: '',
    },
    mode: 'onChange',
  });

  const attendanceType = form.watch('attendanceType');
  const isHalfDay = form.watch('isHalfDay');

  const onSubmit = (data: z.infer<typeof AttendanceFormSchema>) => {
    startTransition(async () => {
      console.log(data);
    });
  };

  const resetAttendanceForm = () => {
    form.reset(
      {
        ...form.getValues(),
        isHalfDay: false,
        halfDayType: 'AM',
        check_in: undefined,
        check_out: undefined,
        rest: undefined,
        comment: '',
      },
      { keepDefaultValues: true },
    );
  };

  const resetHalfDayForm = () => {
    form.reset(
      {
        ...form.getValues(),
        halfDayType: 'AM',
        check_in: undefined,
        check_out: undefined,
        rest: undefined,
        comment: '',
      },
      { keepDefaultValues: true },
    );
  };

  return { form, onSubmit, attendanceType, isHalfDay, resetAttendanceForm, resetHalfDayForm, isPending };
};
