import { z } from 'zod';

export const BatchExpenseSchema = z.object({
  ids: z.array(z.string()).min(1, '申請対象を選択してください'),
  action: z.enum(['Draft']),
  comment: z.string().max(500, 'コメントは500文字以内で入力してください').optional(),
  userId: z.string().min(1, '申請者IDは必須です'),
});

export type BatchExpenseType = z.infer<typeof BatchExpenseSchema>;
export type ActionStatusType = 'Draft';
