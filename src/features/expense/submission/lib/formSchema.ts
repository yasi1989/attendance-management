import { z } from 'zod';
import { VALIDATIONS } from '@/consts/validate';

export const BatchExpenseSchema = z.object({
  comment: z
    .string()
    .max(VALIDATIONS.COMMENT_MAX_LENGTH, `コメントは${VALIDATIONS.COMMENT_MAX_LENGTH}文字以内で入力してください`)
    .optional(),
});

export type BatchExpenseType = z.infer<typeof BatchExpenseSchema>;
