import { z } from 'zod';

export const AttendanceFormSchema = z.object({
    date: z.string(),
    check_in: z.string().min(1, { message: '出勤時間は必須です' }),
    check_out: z.string().min(1, { message: '退勤時間は必須です' }),
    rest: z.string().min(1, { message: '休憩時間は必須です' }),
    attendanceType: z.enum(['WORK'], { required_error: '勤務形態は必須です' }),
    comment: z.string().optional(),
}).refine((data) => {
    const checkInTime = new Date(`2000-01-01T${data.check_in}`);
    const checkOutTime = new Date(`2000-01-01T${data.check_out}`);
    return checkInTime < checkOutTime;
}, {
    message: '出勤時間は退勤時間よりも前に設定してください',
    path: ['check_out'],
});

export const LeaveFormSchema = z.object({
    date: z.string(),
    check_in: z.string().min(1, { message: '出勤時間は必須です' }),
    check_out: z.string().min(1, { message: '退勤時間は必須です' }),
    rest: z.string().min(1, { message: '休憩時間は必須です' }),
    attendanceType: z.enum(['WORK'], { required_error: '勤務形態は必須です' }),
    comment: z.string().optional(),
}).refine((data) => {
    const checkInTime = new Date(`2000-01-01T${data.check_in}`);
    const checkOutTime = new Date(`2000-01-01T${data.check_out}`);
    return checkInTime < checkOutTime;
}, {
    message: '出勤時間は退勤時間よりも前に設定してください',
    path: ['check_out'],
});