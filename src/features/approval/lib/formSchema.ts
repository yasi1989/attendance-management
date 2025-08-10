import { STATUS, STATUS_TRANSITIONS } from '@/consts/status';
import { z } from 'zod';

export const IndividualApprovalSchema = z.object({
  id: z.string().min(1, 'IDは必須です'),
  action: z.enum([...STATUS_TRANSITIONS[STATUS.SUBMITTED.value]], { message: '承認または却下を選択してください' }),
  comment: z.string().max(500, 'コメントは500文字以内で入力してください').optional(),
  approvedById: z.string().min(1, '承認者IDは必須です'),
});

export const BatchApprovalSchema = z.object({
  ids: z.array(z.string()).min(1, '承認対象を選択してください'),
  action: z.enum([...STATUS_TRANSITIONS[STATUS.SUBMITTED.value]], { message: '承認または却下を選択してください' }),
  comment: z.string().max(500, 'コメントは500文字以内で入力してください').optional(),
  approvedById: z.string().min(1, '承認者IDは必須です'),
});

export const ApprovalCommentSchema = z.object({
  comment: z.string().max(500, 'コメントは500文字以内で入力してください').optional(),
});

export type IndividualApprovalType = z.infer<typeof IndividualApprovalSchema>;
export type BatchApprovalType = z.infer<typeof BatchApprovalSchema>;
export type ApprovalCommentType = z.infer<typeof ApprovalCommentSchema>;
