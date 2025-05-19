import { z } from 'zod';

export const CompanyCodeSchema = z.object({
  code: z
    .string()
    .min(1, {
      message: '会社コードは必須です。',
    })
    .max(10, {
      message: '会社コードは10文字以内で入力してください。',
    }),
  name: z
    .string()
    .min(1, {
      message: '会社名は必須です。',
    })
    .max(100, {
      message: '会社名は100文字以内で入力してください。',
    }),
});
