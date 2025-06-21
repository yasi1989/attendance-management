import { UserType } from '@/features/system-admin/users/type/userType';

export type ApprovalStepType = {
  stepOrder: number;
  approverId: string;
  approver: UserType;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedAt?: Date;
  comment?: string;
};
