import { z } from 'zod';
import { STATUS, STATUS_ACTIONS } from '@/consts/status';
import { VALIDATIONS } from '@/consts/validate';

export const IndividualApprovalSchema = z.object({
  id: z.string().min(VALIDATIONS.MIN_LENGTH, 'IDは必須です'),
  action: z.enum(STATUS_ACTIONS.actionApprovalOrRejection, {
    message: `${STATUS.APPROVED.label}または${STATUS.REJECTED.label}を選択してください`,
  }),
  comment: z
    .string()
    .max(VALIDATIONS.COMMENT_MAX_LENGTH, `コメントは${VALIDATIONS.COMMENT_MAX_LENGTH}文字以内で入力してください`)
    .optional(),
});

export const BatchApprovalSchema = z.object({
  ids: z.array(z.string()).min(VALIDATIONS.MIN_LENGTH, '承認対象を選択してください'),
  action: z.enum(STATUS_ACTIONS.actionApprovalOrRejection, {
    message: `${STATUS.APPROVED.label}または${STATUS.REJECTED.label}を選択してください`,
  }),
  comment: z
    .string()
    .max(VALIDATIONS.COMMENT_MAX_LENGTH, `コメントは${VALIDATIONS.COMMENT_MAX_LENGTH}文字以内で入力してください`)
    .optional(),
});

export const ApprovalCommentSchema = z.object({
  comment: z
    .string()
    .max(VALIDATIONS.COMMENT_MAX_LENGTH, `コメントは${VALIDATIONS.COMMENT_MAX_LENGTH}文字以内で入力してください`)
    .optional(),
});

export type IndividualApprovalType = z.infer<typeof IndividualApprovalSchema>;
export type BatchApprovalType = z.infer<typeof BatchApprovalSchema>;
export type ApprovalCommentType = z.infer<typeof ApprovalCommentSchema>;

export type ActionStatusType = (typeof STATUS_ACTIONS.actionApprovalOrRejection)[number];
