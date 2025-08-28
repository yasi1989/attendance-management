import { VALIDATION_LIMITS } from '@/consts/validate';
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(VALIDATION_LIMITS.MIN_LENGTH, {
    message: '名前は必須です。',
  }),
  email: z.string().email({
    message: '有効なメールアドレスを入力してください。',
  }),
  roleId: z.string().nullable().optional(),
  companyId: z.string().nullable().optional(),
});
