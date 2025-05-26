import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, {
    message: '名前は必須です。',
  }),
  lastName: z.string().min(1, {
    message: '姓は必須です。',
  }),
  roleId: z.string().optional(),
  companyId: z.string().optional(),
});
