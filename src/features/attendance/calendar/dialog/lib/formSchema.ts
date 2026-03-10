import { z } from 'zod';
import { VALIDATIONS } from '@/consts/validate';
import { ATTENDANCES, ATTENDANCES_LIST, HALF_DAYS_LIST } from '../../../../../consts/attendance';

export const AttendanceFormSchema = z
  .object({
    date: z.date({ message: '勤務日を設定してください' }),
    attendanceType: z.enum([...ATTENDANCES_LIST] as [string, ...string[]], { message: '勤怠種別を選択してください' }),
    isHalfDay: z.boolean().isNullable(),
    halfDayType: z
      .enum([...HALF_DAYS_LIST] as [string, ...string[]], { message: '午前半休または午後半休を選択してください' })
      .optional(),
    startTime: z.number().optional(),
    endTime: z.number().optional(),
    breakTime: z.number().optional(),
    comment: z
      .string()
      .max(VALIDATIONS.COMMENT_MAX_LENGTH, `コメントは${VALIDATIONS.COMMENT_MAX_LENGTH}文字以内で入力してください`)
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
  });
