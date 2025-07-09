import { z } from 'zod';

export const HolidaySchema = z.object({
  name: z.string().min(1, {
    message: '休日名は必須です。',
  }),
  holidayDate: z.date({
    required_error: '休日日付は必須です。',
    invalid_type_error: '休日日付は日付形式で入力してください。',
  }),
});
