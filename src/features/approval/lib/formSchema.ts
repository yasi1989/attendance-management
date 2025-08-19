import { STATUS, STATUS_ACTIONS } from '@/consts/status';
import { VALIDATION_LIMITS } from '@/consts/validate';
import { z } from 'zod';

export const IndividualApprovalSchema = z.object({
  id: z.string().min(VALIDATION_LIMITS.MIN_LENGTH, 'IDは必須です'),
  action: z.enum([...STATUS_ACTIONS.actionApprovalOrRejection] as [string, ...string[]], {
    message: `${STATUS.APPROVED.label}または${STATUS.REJECTED.label}を選択してください`,
  }),
  comment: z
    .string()
    .max(
      VALIDATION_LIMITS.COMMENT_MAX_LENGTH,
      `コメントは${VALIDATION_LIMITS.COMMENT_MAX_LENGTH}文字以内で入力してください`,
    )
    .optional(),
  approvedById: z.string().min(VALIDATION_LIMITS.MIN_LENGTH, '承認者IDは必須です'),
});

export const BatchApprovalSchema = z.object({
  ids: z.array(z.string()).min(VALIDATION_LIMITS.MIN_LENGTH, '承認対象を選択してください'),
  action: z.enum([...STATUS_ACTIONS.actionApprovalOrRejection] as [string, ...string[]], {
    message: `${STATUS.APPROVED.label}または${STATUS.REJECTED.label}を選択してください`,
  }),
  comment: z
    .string()
    .max(
      VALIDATION_LIMITS.COMMENT_MAX_LENGTH,
      `コメントは${VALIDATION_LIMITS.COMMENT_MAX_LENGTH}文字以内で入力してください`,
    )
    .optional(),
  approvedById: z.string().min(VALIDATION_LIMITS.MIN_LENGTH, '承認者IDは必須です'),
});

export const ApprovalCommentSchema = z.object({
  comment: z
    .string()
    .max(
      VALIDATION_LIMITS.COMMENT_MAX_LENGTH,
      `コメントは${VALIDATION_LIMITS.COMMENT_MAX_LENGTH}文字以内で入力してください`,
    )
    .optional(),
});

export type IndividualApprovalType = z.infer<typeof IndividualApprovalSchema>;
export type BatchApprovalType = z.infer<typeof BatchApprovalSchema>;
export type ApprovalCommentType = z.infer<typeof ApprovalCommentSchema>;
