import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ERROR_MESSAGE } from '@/consts/validate';
import { Attendance } from '@/lib/actionTypes';
import { AttendanceType, HalfDayType } from '@/types/attendance';
import { ATTENDANCES, HALF_DAYS } from '../../../../../consts/attendance';
import { createAttendanceAction, deleteAttendanceAction, updateAttendanceAction } from '../api/actions';
import { AttendanceFormSchema } from '../lib/formSchema';

type UseAttendanceProps = {
  day: Date;
  attendanceData?: Attendance;
  isDisabled?: boolean;
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

export const useAttendance = ({ day, attendanceData, isDisabled }: UseAttendanceProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AttendanceFormSchema>>({
    resolver: zodResolver(AttendanceFormSchema),
    defaultValues: { date: day, ...DEFAULT_FORM_VALUES },
    values: attendanceData
      ? {
          date: day,
          attendanceType: attendanceData.attendanceType as AttendanceType,
          isHalfDay: attendanceData.isHalfDay,
          halfDayType: attendanceData.halfDayType as HalfDayType,
          startTime: attendanceData.startTime,
          endTime: attendanceData.endTime,
          breakTime: attendanceData.breakTime,
          comment: attendanceData.comment,
        }
      : undefined,
    mode: 'onChange',
  });

  const attendanceType = form.watch('attendanceType') as AttendanceType;
  const isHalfDay = form.watch('isHalfDay') as boolean;

  const onSubmit = (data: z.infer<typeof AttendanceFormSchema>) => {
    startTransition(async () => {
      try {
        const action = attendanceData ? updateAttendanceAction : createAttendanceAction;
        const { success, error } = await action(data);
        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
        } else {
          toast.success(attendanceData ? '勤怠を更新しました。' : '勤怠を登録しました。');
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${ERROR_MESSAGE.UNEXPECTED_ERROR}: ${error.message}`);
        } else {
          toast.error(ERROR_MESSAGE.SYSTEM_ERROR);
        }
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
    form.reset({ date: day, ...DEFAULT_FORM_VALUES });
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

export const useDeleteAttendance = (attendanceId: string) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      try {
        const { success, error } = await deleteAttendanceAction(attendanceId);
        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
        } else {
          toast.success('勤怠を削除しました。');
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${ERROR_MESSAGE.UNEXPECTED_ERROR}: ${error.message}`);
        } else {
          toast.error(ERROR_MESSAGE.SYSTEM_ERROR);
        }
      }
    });
  };

  return { onDelete, isPending };
};
