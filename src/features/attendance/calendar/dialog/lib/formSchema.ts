import { z } from 'zod';
import { ATTENDANCES_LIST, HALF_DAYS_LIST } from '../../../../../consts/attendance';

export const AttendanceFormSchema = z
  .object({
    date: z.date({ message: '勤務日を設定してください' }),
    attendanceType: z.enum(ATTENDANCES_LIST, { message: '勤怠種別を選択してください' }),
    isHalfDay: z.boolean().optional(),
    halfDayType: z.enum(HALF_DAYS_LIST).optional(),
    check_in: z.number().optional(),
    check_out: z.number().optional(),
    rest: z.number().optional(),
    comment: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.attendanceType === 'Work' || (data.isHalfDay && data.attendanceType === 'Paid')) {
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
