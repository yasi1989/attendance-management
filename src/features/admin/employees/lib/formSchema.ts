import { z } from 'zod';

export const EmployeeSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, {
    message: '名前は必須です。',
  }),
  lastName: z.string().min(1, {
    message: '姓は必須です。',
  }),
  email: z.string().email({
    message: 'メールアドレスは必須です。',
  }),
  departmentId: z.string().optional(),
  roleId: z.string().optional(),
});
