import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, {
    message: '名前は必須です。',
  }),
  lastName: z.string().min(1, {
    message: '姓は必須です。',
  }),
  email: z.string().email({
    message: '有効なメールアドレスを入力してください。',
  }),
  roleId: z.string().optional(),
  companyId: z.string().optional(),
});
