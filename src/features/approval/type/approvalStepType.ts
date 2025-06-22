import { StatusType } from '@/features/shared/type/statusType';
import { UserType } from '@/features/system-admin/users/type/userType';

export type ApprovalStepType = {
  stepOrder: number;
  approverId: string;
  approver: UserType;
  status: StatusType;
  statusName: string;
  approvedAt?: Date;
  comment?: string;
};
