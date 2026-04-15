import { z } from 'zod';
import { VALIDATIONS } from '@/consts/validate';
import { ATTENDANCES, ATTENDANCES_LIST, HALF_DAYS, HALF_DAYS_LIST, WORK_RULES } from '../../../../../consts/attendance';

export const AttendanceFormSchema = z
  .object({
    date: z.date({ message: '勤務日を設定してください' }),
    attendanceType: z.enum(ATTENDANCES_LIST, { message: '勤怠種別を選択してください' }),
    isHalfDay: z.boolean(),
    halfDayType: z.enum(HALF_DAYS_LIST, { message: '午前半休または午後半休を選択してください' }).nullable().optional(),
    startTime: z.number().nullable().optional(),
    endTime: z.number().nullable().optional(),
    breakTime: z.number().nullable().optional(),
    comment: z
      .string()
      .max(VALIDATIONS.COMMENT_MAX_LENGTH, `コメントは${VALIDATIONS.COMMENT_MAX_LENGTH}文字以内で入力してください`)
      .nullable()
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.attendanceType === ATTENDANCES.WORK.value ||
      (data.isHalfDay && data.attendanceType === ATTENDANCES.PAID.value)
    ) {
      if (!data.startTime) {
        ctx.addIssue({
          code: 'custom',
          message: '出勤時間は必須です',
          path: ['startTime'],
        });
      }
      if (!data.endTime) {
        ctx.addIssue({
          code: 'custom',
          message: '退勤時間は必須です',
          path: ['endTime'],
        });
      }
    }
  })
  .superRefine((data, ctx) => {
    if (data.startTime && data.endTime) {
      if (data.startTime >= data.endTime) {
        ctx.addIssue({
          code: 'custom',
          message: '出勤時間は退勤時間よりも前に設定してください',
          path: ['endTime'],
        });
      }
    }
  })
  .superRefine((data, ctx) => {
    if (data.attendanceType !== ATTENDANCES.PAID.value || !data.isHalfDay) return;

    if (data.halfDayType === HALF_DAYS.AM.value && data.startTime != null) {
      if (data.startTime < WORK_RULES.HALF_DAY_AM_START_MINUTES) {
        ctx.addIssue({
          code: 'custom',
          message: `午前休の場合、出勤時間は${WORK_RULES.HALF_DAY_AM_START_LABEL}以降を設定してください`,
          path: ['startTime'],
        });
      }
    }

    if (data.halfDayType === HALF_DAYS.PM.value && data.endTime != null) {
      if (data.endTime > WORK_RULES.HALF_DAY_PM_END_MINUTES) {
        ctx.addIssue({
          code: 'custom',
          message: `午後休の場合、退勤時間は${WORK_RULES.HALF_DAY_PM_END_LABEL}以前を設定してください`,
          path: ['endTime'],
        });
      }
    }
  });
