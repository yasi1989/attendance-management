import { VALIDATION_LIMITS } from '@/consts/validate';
import { z } from 'zod';

export const HolidaySchema = z.object({
  name: z.string().min(VALIDATION_LIMITS.MIN_LENGTH, {
    message: '休日名は必須です。',
  }),
  holidayDate: z.date({
    message: '日付は設定してください。',
  }),
});
