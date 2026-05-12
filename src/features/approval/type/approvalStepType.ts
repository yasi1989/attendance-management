export type ApprovalStepType = {
  id: string;
  stepOrder: number;
  approverId: string;
  statusCode: string;
  approvedAt: Date | null;
  comment: string | null;
};
