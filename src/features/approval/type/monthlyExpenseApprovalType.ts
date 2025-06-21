import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { UserType } from '@/features/system-admin/users/type/userType';
import { StatusType } from './statusType';
import { ApprovalStepType } from './approvalStepType';

export type MonthlyExpenseApprovalType = {
  id: string;
  userId: string;
  user: UserType & {
    department: DepartmentType;
  };
  year: string;
  month: string;
  status: StatusType;
  totalAmount: number;
  itemCount: number;
  categoryBreakdown: Record<string, { name: string; amount: number; count: number }>;
  submittedAt: string;
  issues: string[];
  approvalSteps: ApprovalStepType[];
};
