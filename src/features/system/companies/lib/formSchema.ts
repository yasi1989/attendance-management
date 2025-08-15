import { VALIDATION_LIMITS } from '@/consts/validate';
import { z } from 'zod';

export const CompanySchema = z.object({
  name: z.string().min(VALIDATION_LIMITS.MIN_LENGTH, {
    message: '会社名は必須です。',
  }),
  domain: z
    .string()
    .min(VALIDATION_LIMITS.MIN_LENGTH, {
      message: 'ドメインは必須です。',
    })
    .refine((value) => VALIDATION_LIMITS.DOMAIN_REGEX.test(value), '有効なドメイン形式で入力してください。')
    .refine((value) => !value.includes('@'), "ドメインには'@'を含めないでください。"),
});
