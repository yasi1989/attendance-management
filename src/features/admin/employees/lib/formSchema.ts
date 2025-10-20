import { VALIDATION_LIMITS } from '@/consts/validate';
import { z } from 'zod';

export const EmployeeSchema = z.object({
  id: z.string(),
  firstName: z.string().min(VALIDATION_LIMITS.MIN_LENGTH, {
    message: '名前は必須です。',
  }),
  lastName: z.string().min(VALIDATION_LIMITS.MIN_LENGTH, {
    message: '姓は必須です。',
  }),
  email: z.string().email({
    message: '有効なメールアドレスを入力してください。',
  }),
  departmentId: z.string().optional(),
  roleId: z.string().optional(),
});
