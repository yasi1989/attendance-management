import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ERROR_MESSAGE } from '@/consts/validate';
import { Attendance } from '@/lib/actionTypes';
import { AttendanceType, HalfDayType } from '@/types/attendance';
import { ATTENDANCES, HALF_DAYS } from '../../../../../consts/attendance';
import { createAttendanceAction, deleteAttendanceAction, updateAttendanceAction } from '../../api/action';
import { AttendanceFormSchema } from '../lib/formSchema';

type UseAttendanceProps = {
  day: Date;
  attendanceData?: Attendance;
  isDisabled?: boolean;
  onSuccess?: () => void;
};

type UseDeleteAttendanceProps = {
  id: string;
  onSuccess?: () => void;
};

const DEFAULT_FORM_VALUES = {
  attendanceType: ATTENDANCES.WORK.value as AttendanceType,
  isHalfDay: false,
  halfDayType: HALF_DAYS.AM.value as HalfDayType,
  startTime: undefined,
  endTime: undefined,
  breakTime: undefined,
  comment: '',
} as const;

const TIME_FIELD_RESET = {
  startTime: undefined,
  endTime: undefined,
  breakTime: undefined,
  comment: '',
} as const;

const toUndefined = <T>(value: T | null | undefined): T | undefined => value ?? undefined;

const toFormValues = (day: Date, attendanceData: Attendance) => ({
  date: day,
  attendanceType: attendanceData.attendanceType as AttendanceType,
  isHalfDay: attendanceData.isHalfDay,
  halfDayType: toUndefined(attendanceData.halfDayType as HalfDayType | null),
  startTime: toUndefined(attendanceData.startTime),
  endTime: toUndefined(attendanceData.endTime),
  breakTime: toUndefined(attendanceData.breakTime),
  comment: toUndefined(attendanceData.comment),
});

const handleActionError = (error: unknown) => {
  toast.error(
    error instanceof Error ? `${ERROR_MESSAGE.UNEXPECTED_ERROR}: ${error.message}` : ERROR_MESSAGE.SYSTEM_ERROR,
  );
};

export const useAttendance = ({ day, attendanceData, isDisabled, onSuccess }: UseAttendanceProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AttendanceFormSchema>>({
    resolver: zodResolver(AttendanceFormSchema),
    defaultValues: { date: day, ...DEFAULT_FORM_VALUES },
    mode: 'onChange',
  });

  useEffect(() => {
    const values = attendanceData ? toFormValues(day, attendanceData) : { date: day, ...DEFAULT_FORM_VALUES };
    form.reset(values);
    form.clearErrors();
  }, [attendanceData, day, form]);

  const attendanceType = form.watch('attendanceType') as AttendanceType;
  const isHalfDay = form.watch('isHalfDay') as boolean;

  const onSubmit = (data: z.infer<typeof AttendanceFormSchema>) => {
    startTransition(async () => {
      try {
        const { success, error } = await (attendanceData
          ? updateAttendanceAction(attendanceData.id, data)
          : createAttendanceAction(data));
        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
        } else {
          toast.success(attendanceData ? '勤怠を更新しました。' : '勤怠を登録しました。');
          onSuccess?.();
        }
      } catch (error) {
        handleActionError(error);
      }
    });
  };

  const resetAttendanceForm = () => {
    if (isDisabled) return;
    form.reset(
      { ...form.getValues(), isHalfDay: false, halfDayType: HALF_DAYS.AM.value, ...TIME_FIELD_RESET },
      { keepDefaultValues: false },
    );
  };

  const resetHalfDayForm = () => {
    if (isDisabled) return;
    form.reset(
      { ...form.getValues(), halfDayType: HALF_DAYS.AM.value, ...TIME_FIELD_RESET },
      { keepDefaultValues: false },
    );
  };

  const resetToDefault = () => {
    if (isDisabled) return;
    const values = attendanceData ? toFormValues(day, attendanceData) : { date: day, ...DEFAULT_FORM_VALUES };
    form.reset(values);
    requestAnimationFrame(() => form.clearErrors());
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

export const useDeleteAttendance = ({ id, onSuccess }: UseDeleteAttendanceProps) => {
  const [isDeletePending, startTransition] = useTransition();

  const onDelete = () => {
    if (!id) return;
    startTransition(async () => {
      try {
        const { success, error } = await deleteAttendanceAction(id);
        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
        } else {
          toast.success('勤怠を削除しました。');
          onSuccess?.();
        }
      } catch (error) {
        handleActionError(error);
      }
    });
  };

  return { onDelete, isDeletePending };
};
