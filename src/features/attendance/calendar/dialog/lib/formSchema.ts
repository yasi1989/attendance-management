import { z } from 'zod';
import { ATTENDANCE_OPTIONS, HALF_DAY_OPTIONS } from '../const/attendanceConst';

const attendanceTypeValues = ATTENDANCE_OPTIONS.map((type) => type.value) as [string, ...string[]];
const halfDayTypeValues = HALF_DAY_OPTIONS.map((type) => type.value) as [string, ...string[]];

export const AttendanceFormSchema = z
  .object({
    date: z.date({
      required_error: '勤務日を設定してください',
    }),
    attendanceType: z.enum(attendanceTypeValues, { required_error: '勤怠種別を選択してください' }),
    isHalfDay: z.boolean().optional(),
    halfDayType: z.enum(halfDayTypeValues).optional(),
    check_in: z.number().optional(),
    check_out: z.number().optional(),
    rest: z.number().optional(),
    comment: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.attendanceType === 'Work' || (data.isHalfDay && data.attendanceType === 'Paid')) {
      if (!data.check_in) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '出勤時間は必須です',
          path: ['check_in'],
        });
      }
      if (!data.check_out) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
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
          code: z.ZodIssueCode.custom,
          message: '出勤時間は退勤時間よりも前に設定してください',
          path: ['check_out'],
        });
      }
    }
  });
