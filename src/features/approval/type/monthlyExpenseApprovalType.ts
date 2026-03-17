import { UserType } from '@/features/system/users/type/userType';
import { Department } from '@/lib/actionTypes';
import { StatusType } from '@/types/statusType';
import { ApprovalStepType } from './approvalStepType';

export type MonthlyExpenseApprovalItem = {
  id: string;
  userId: string;
  user: UserType & {
    department: Department;
  };
  targetMonth: Date;
  status: StatusType;
  totalAmount: number;
  itemCount: number;
  categoryBreakdown: Record<string, { name: string; amount: number; count: number }>;
  submittedAt: string;
  issues: string[];
  approvalSteps: ApprovalStepType[];
};

export type ExpenseApprovalData = {
  expenses: MonthlyExpenseApprovalItem[];
};
