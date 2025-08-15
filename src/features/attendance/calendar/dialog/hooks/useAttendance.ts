import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback, useMemo, useTransition } from 'react';
import { AttendanceData, AttendanceType, HalfDayType } from '../../types/attendance';
import { AttendanceFormSchema } from '../lib/formSchema';
import { ATTENDANCES, HALF_DAYS } from '../../../../../consts/attendance';

export const useAttendance = (day: Date, attendanceData?: AttendanceData, isDisabled?: boolean) => {
  const [isPending, startTransition] = useTransition();
  const defaultValues = useMemo(() => {
    return attendanceData
      ? {
          date: day,
          attendanceType: attendanceData.attendanceType as AttendanceType,
          isHalfDay: attendanceData.isHalfDay,
          halfDayType: attendanceData.halfDayType as HalfDayType,
          check_in: attendanceData.check_in,
          check_out: attendanceData.check_out,
          rest: attendanceData.rest,
          comment: attendanceData.comment,
        }
      : {
          date: day,
          attendanceType: ATTENDANCES.WORK.value as AttendanceType,
          isHalfDay: false,
          halfDayType: HALF_DAYS.AM.value as HalfDayType,
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

  const attendanceType = form.watch('attendanceType') as AttendanceType;
  const isHalfDay = form.watch('isHalfDay') as boolean;

  const onSubmit = useCallback((data: z.infer<typeof AttendanceFormSchema>) => {
    startTransition(async () => {
      console.log(data);
    });
  }, []);

  const onDelete = useCallback(() => {
    startTransition(async () => {
      console.log('delete');
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
        halfDayType: HALF_DAYS.AM.value,
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
        halfDayType: HALF_DAYS.AM.value,
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
    onDelete,
    attendanceType,
    isHalfDay,
    resetAttendanceForm,
    resetHalfDayForm,
    resetToDefault,
    isPending,
  };
};
