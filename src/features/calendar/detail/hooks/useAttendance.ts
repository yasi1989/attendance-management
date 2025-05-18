import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AttendanceFormSchema } from '@/features/calendar/detail/lib/formSchema';
import { z } from 'zod';
import { useCallback, useEffect, useTransition } from 'react';

export const useAttendance = (dateString: string) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AttendanceFormSchema>>({
    resolver: zodResolver(AttendanceFormSchema),
    defaultValues: {
      date: dateString,
      attendanceType: 'WORK',
      isHalfDay: false,
      halfDayType: 'AM',
      check_in: '',
      check_out: '',
      rest: '',
      comment: '',
    },
    mode: 'onChange',
  });
  const onSubmit = (data: z.infer<typeof AttendanceFormSchema>) => {
    startTransition(async () => {
      console.log(data);
    });
  };
  const attendanceType = useWatch({
    control: form.control,
    name: 'attendanceType',
  });
  const isHalfDay = useWatch({
    control: form.control,
    name: 'isHalfDay',
  });

  const resetAttendanceForm = useCallback(() => {
    form.reset(
      {
        ...form.getValues(),
        isHalfDay: false,
        halfDayType: 'AM',
        check_in: '',
        check_out: '',
        rest: '',
        comment: '',
      },
      { keepDefaultValues: true },
    );
  }, [form.reset, form.getValues]);

  const resetHalfDayForm = useCallback(() => {
    form.reset(
      {
        ...form.getValues(),
        halfDayType: 'AM',
        check_in: '',
        check_out: '',
        rest: '',
        comment: '',
      },
      { keepDefaultValues: true },
    );
  }, [form.reset, form.getValues]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    resetAttendanceForm();
  }, [attendanceType]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    resetHalfDayForm();
  }, [isHalfDay]);

  return { form, onSubmit, attendanceType, isHalfDay, isPending };
};
