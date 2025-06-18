import { z } from 'zod';

export const CompanySchema = z.object({
  name: z.string().min(1, {
    message: '会社名は必須です。',
  }),
  domain: z
    .string()
    .min(1, {
      message: 'ドメインは必須です。',
    })
    .refine(
      (value) => /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.([a-zA-Z]{2,})+$/.test(value),
      '有効なドメイン形式で入力してください（例: company.com）',
    )
    .refine((value) => !value.includes('@'), "ドメインには'@'を含めないでください。"),
});
