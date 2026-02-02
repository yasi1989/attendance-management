import { z } from 'zod';
import { VALIDATIONS } from '@/consts/validate';

const FormSchema = z.object({
  id: z.string(),
  companyName: z.string().min(VALIDATIONS.MIN_LENGTH, {
    message: '会社名は必須です。',
  }),
  domain: z
    .string()
    .min(VALIDATIONS.MIN_LENGTH, {
      message: 'ドメインは必須です。',
    })
    .refine((value) => VALIDATIONS.DOMAIN_REGEX.test(value), '有効なドメイン形式で入力してください。')
    .refine((value) => !value.includes('@'), "ドメインには'@'を含めないでください。"),
});

export const AddCompanySchema = FormSchema;
export const EditCompanySchema = FormSchema.extend({ id: z.string().nonempty({ message: 'IDは必須です。' }) });
