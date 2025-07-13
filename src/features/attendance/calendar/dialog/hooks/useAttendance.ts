import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTransition } from 'react';
import { AttendanceData } from '../../types/attendance';
import { AttendanceFormSchema } from '../lib/formSchema';

export const useAttendance = (day: Date, attendanceData?: AttendanceData) => {
  const [isPending, startTransition] = useTransition();
  const defaultValues = attendanceData
    ? {
        date: day,
        attendanceType: attendanceData.attendanceType || 'Work',
        isHalfDay: attendanceData.isHalfDay,
        halfDayType: attendanceData.halfDayType,
        check_in: attendanceData.check_in,
        check_out: attendanceData.check_out,
        rest: attendanceData.rest,
        comment: attendanceData.comment,
      }
    : {
        date: day,
        attendanceType: 'Work',
        isHalfDay: false,
        halfDayType: 'Am',
        check_in: undefined,
        check_out: undefined,
        rest: undefined,
        comment: '',
      };

  const form = useForm<z.infer<typeof AttendanceFormSchema>>({
    resolver: zodResolver(AttendanceFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const attendanceType = form.watch('attendanceType');
  const isHalfDay = form.watch('isHalfDay');

  const onSubmit = (data: z.infer<typeof AttendanceFormSchema>) => {
    startTransition(async () => {
      console.log(data);
    });
  };

  const resetTimeFields = () => {
    const resetFields = {
      check_in: undefined,
      check_out: undefined,
      rest: undefined,
      comment: '',
    };
    return resetFields;
  };

  const resetAttendanceForm = () => {
    form.reset(
      {
        ...form.getValues(),
        isHalfDay: false,
        halfDayType: 'Am',
        ...resetTimeFields(),
      },
      { keepDefaultValues: false },
    );
  };

  const resetHalfDayForm = () => {
    form.reset(
      {
        ...form.getValues(),
        halfDayType: 'Am',
        ...resetTimeFields(),
      },
      { keepDefaultValues: false },
    );
  };

  const resetToDefault = () => {
    form.clearErrors();
    form.reset(defaultValues);

    requestAnimationFrame(() => {
      form.clearErrors();
    });
  };

  return {
    form,
    onSubmit,
    attendanceType,
    isHalfDay,
    resetAttendanceForm,
    resetHalfDayForm,
    resetToDefault,
    isPending,
  };
};
