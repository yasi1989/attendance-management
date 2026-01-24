import { UserType } from '@/features/system/users/type/userType';
import { StatusType } from '@/types/statusType';

export type ApprovalStepType = {
  stepOrder: number;
  approverId: string;
  approver: UserType;
  status: StatusType;
  approvedAt?: Date;
  comment?: string;
};
