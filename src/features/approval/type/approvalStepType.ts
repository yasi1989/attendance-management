import { StatusType } from '@/types/statusType';

export type ApprovalStepType = {
  id: string;
  stepOrder: number;
  approverId: string;
  approverName: string;
  statusCode: StatusType;
  approvedAt: Date | null;
  comment: string | null;
};
