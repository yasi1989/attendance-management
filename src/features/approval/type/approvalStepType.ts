import { StatusType } from '@/types/statusType';
import { UserType } from '@/features/system/users/type/userType';

export type ApprovalStepType = {
  stepOrder: number;
  approverId: string;
  approver: UserType;
  status: StatusType;
  statusName: string;
  approvedAt?: Date;
  comment?: string;
};
