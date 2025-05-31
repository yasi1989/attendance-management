import { z } from 'zod';

export const HolidaySchema = z.object({
  code: z
    .string()
    .min(1, {
      message: '休日コードは必須です。',
    })
    .max(10, {
      message: '休日コードは10文字以内で入力してください。',
    }),
  name: z
    .string()
    .min(1, {
      message: '休日名は必須です。',
    })
    .max(100, {
      message: '休日名は100文字以内で入力してください。',
    }),
  holidayDate: z.date({
    required_error: '休日日付は必須です。',
    invalid_type_error: '休日日付は日付形式で入力してください。',
  }),
});
