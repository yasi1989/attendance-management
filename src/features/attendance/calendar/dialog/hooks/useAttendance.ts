import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback, useMemo, useTransition } from 'react';
import { AttendanceData } from '../../types/attendance';
import { AttendanceFormSchema } from '../lib/formSchema';

const isFormDisabled = (attendanceData?: AttendanceData): boolean => {
  return attendanceData?.status === 'Submitted' || attendanceData?.status === 'Approved';
};

export const useAttendance = (day: Date, attendanceData?: AttendanceData) => {
  const [isPending, startTransition] = useTransition();
  const defaultValues = useMemo(() => {
    return attendanceData
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
  }, [day, attendanceData]);

  const form = useForm<z.infer<typeof AttendanceFormSchema>>({
    resolver: zodResolver(AttendanceFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const attendanceType = form.watch('attendanceType');
  const isHalfDay = form.watch('isHalfDay');

  const isDisabled = useMemo(() => isFormDisabled(attendanceData), [attendanceData]);

  const onSubmit = useCallback((data: z.infer<typeof AttendanceFormSchema>) => {
    startTransition(async () => {
      console.log(data);
    });
  }, []);

  const resetTimeFields = useCallback(() => {
    return {
      check_in: undefined,
      check_out: undefined,
      rest: undefined,
      comment: '',
    };
  }, []);

  const resetAttendanceForm = useCallback(() => {
    if (isDisabled) return;

    form.reset(
      {
        ...form.getValues(),
        isHalfDay: false,
        halfDayType: 'Am',
        ...resetTimeFields(),
      },
      { keepDefaultValues: false },
    );
  }, [form, isDisabled, resetTimeFields]);

  const resetHalfDayForm = useCallback(() => {
    if (isDisabled) return;

    form.reset(
      {
        ...form.getValues(),
        halfDayType: 'Am',
        ...resetTimeFields(),
      },
      { keepDefaultValues: false },
    );
  }, [form, isDisabled, resetTimeFields]);

  const resetToDefault = useCallback(() => {
    if (isDisabled) return;

    form.clearErrors();
    form.reset(defaultValues);

    requestAnimationFrame(() => {
      form.clearErrors();
    });
  }, [form, defaultValues, isDisabled]);

  return {
    form,
    onSubmit,
    attendanceType,
    isHalfDay,
    resetAttendanceForm,
    resetHalfDayForm,
    resetToDefault,
    isPending,
    isDisabled,
  };
};
