import { z } from 'zod';

// 個別承認アクションのスキーマ
export const IndividualApprovalSchema = z.object({
  id: z.string().min(1, 'IDは必須です'),
  action: z.enum(['approve', 'reject'], {
    required_error: '承認または却下を選択してください',
  }),
  comment: z.string().max(500, 'コメントは500文字以内で入力してください').optional(),
  approvedById: z.string().min(1, '承認者IDは必須です'),
});

// 一括承認のスキーマ
export const BatchApprovalSchema = z.object({
  ids: z.array(z.string()).min(1, '承認対象を選択してください'),
  action: z.enum(['approve', 'reject']),
  comment: z.string().max(500, 'コメントは500文字以内で入力してください').optional(),
  approvedById: z.string().min(1, '承認者IDは必須です'),
});

// 承認コメントのスキーマ
export const ApprovalCommentSchema = z.object({
  comment: z.string().max(500, 'コメントは500文字以内で入力してください').optional(),
});

export type IndividualApprovalType = z.infer<typeof IndividualApprovalSchema>;
export type BatchApprovalType = z.infer<typeof BatchApprovalSchema>;
export type ApprovalCommentType = z.infer<typeof ApprovalCommentSchema>;