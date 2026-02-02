import { z } from 'zod';
import { VALIDATIONS } from '@/consts/validate';

export const HolidaySchema = z.object({
  name: z.string().min(VALIDATIONS.MIN_LENGTH, {
    message: '休日名は必須です。',
  }),
  holidayDate: z.date({
    message: '日付は設定してください。',
  }),
});
