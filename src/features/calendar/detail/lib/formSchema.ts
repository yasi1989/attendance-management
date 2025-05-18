import { z } from 'zod';
import { ATTENDANCE_TYPES, HALF_DAY_TYPES } from '../const/attendanceConst';
import { HalfDayTypeValue, LeaveTypeValue } from '../type/attendanceType';

const attendanceTypeValues = ATTENDANCE_TYPES.map((type) => type.value) as [LeaveTypeValue, ...LeaveTypeValue[]];
const halfDayTypeValues = HALF_DAY_TYPES.map((type) => type.value) as [HalfDayTypeValue, ...HalfDayTypeValue[]];

export const AttendanceFormSchema = z
  .object({
    date: z.string(),
    attendanceType: z.enum(attendanceTypeValues, { required_error: '勤怠種別を選択してください' }),
    isHalfDay: z.boolean().optional(),
    halfDayType: z.enum(halfDayTypeValues).optional(),
    check_in: z.string().optional(),
    check_out: z.string().optional(),
    rest: z.string().optional(),
    comment: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.attendanceType === 'WORK' || (data.isHalfDay && data.attendanceType === 'PAID_LEAVE')) {
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
      if (!data.rest) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '休憩時間は必須です',
          path: ['rest'],
        });
      }
    }
  })
  .superRefine((data, ctx) => {
    if (data.attendanceType === 'WORK' || (data.isHalfDay && data.attendanceType === 'PAID_LEAVE')) {
      const checkInTime = new Date(`2000-01-01T${data.check_in}`);
      const checkOutTime = new Date(`2000-01-01T${data.check_out}`);
      console.log(checkInTime, checkOutTime);
      if (checkInTime >= checkOutTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '出勤時間は退勤時間よりも前に設定してください',
          path: ['check_out'],
        });
      }
    }
  });
