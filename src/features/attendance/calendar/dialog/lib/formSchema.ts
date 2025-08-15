import { z } from 'zod';
import { ATTENDANCES, ATTENDANCES_LIST, HALF_DAYS_LIST } from '../../../../../consts/attendance';
import { VALIDATION_LIMITS } from '@/consts/validate';

export const AttendanceFormSchema = z
  .object({
    date: z.date({ message: '勤務日を設定してください' }),
    attendanceType: z.enum([...ATTENDANCES_LIST] as [string, ...string[]], { message: '勤怠種別を選択してください' }),
    isHalfDay: z.boolean().optional(),
    halfDayType: z
      .enum([...HALF_DAYS_LIST] as [string, ...string[]], { message: '午前半休または午後半休を選択してください' })
      .optional(),
    check_in: z.number().optional(),
    check_out: z.number().optional(),
    rest: z.number().optional(),
    comment: z
      .string()
      .max(
        VALIDATION_LIMITS.COMMENT_MAX_LENGTH,
        `コメントは${VALIDATION_LIMITS.COMMENT_MAX_LENGTH}文字以内で入力してください`,
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.attendanceType === ATTENDANCES.WORK.value ||
      (data.isHalfDay && data.attendanceType === ATTENDANCES.PAID.value)
    ) {
      if (!data.check_in) {
        ctx.addIssue({
          code: 'custom',
          message: '出勤時間は必須です',
          path: ['check_in'],
        });
      }
      if (!data.check_out) {
        ctx.addIssue({
          code: 'custom',
          message: '退勤時間は必須です',
          path: ['check_out'],
        });
      }
    }
  })
  .superRefine((data, ctx) => {
    if (data.check_in && data.check_out) {
      if (data.check_in >= data.check_out) {
        ctx.addIssue({
          code: 'custom',
          message: '出勤時間は退勤時間よりも前に設定してください',
          path: ['check_out'],
        });
      }
    }
  });
