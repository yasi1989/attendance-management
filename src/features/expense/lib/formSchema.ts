import { VALIDATION_LIMITS } from '@/consts/validate';
import { z } from 'zod';

export const BatchExpenseSchema = z.object({
  ids: z.array(z.string()).min(VALIDATION_LIMITS.MIN_LENGTH, '申請対象を選択してください'),
  comment: z
    .string()
    .max(
      VALIDATION_LIMITS.COMMENT_MAX_LENGTH,
      `コメントは${VALIDATION_LIMITS.COMMENT_MAX_LENGTH}文字以内で入力してください`,
    )
    .optional(),
  userId: z.string().min(VALIDATION_LIMITS.MIN_LENGTH, '申請者IDは必須です'),
});

export type BatchExpenseType = z.infer<typeof BatchExpenseSchema>;
