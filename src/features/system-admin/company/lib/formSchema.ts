import { z } from 'zod';

export const CompanySchema = z.object({
  name: z
    .string()
    .min(1, {
      message: '会社名は必須です。',
    })
});
