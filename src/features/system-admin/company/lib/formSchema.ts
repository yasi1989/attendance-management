import { z } from 'zod';

export const CompanyCodeSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: '会社名は必須です。',
    })
});
