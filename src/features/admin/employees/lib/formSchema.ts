import { z } from 'zod';
import { VALIDATIONS } from '@/consts/validate';

export const EmployeeSchema = z.object({
  id: z.string(),
  name: z.string().min(VALIDATIONS.MIN_LENGTH, {
    message: '従業員名は必須です。',
  }),
  email: z.string().email({
    message: '有効なメールアドレスを入力してください。',
  }),
  departmentId: z.string().optional().nullable(),
  roleId: z.string().optional().nullable(),
});
