import { DepartmentType } from '@/features/system/users/type/departmentType';
import { UserType } from '@/features/system/users/type/userType';
import { ApprovalStepType } from './approvalStepType';
import { StatusType } from '@/types/statusType';

export type MonthlyExpenseApprovalItem = {
  id: string;
  userId: string;
  user: UserType & {
    department: DepartmentType;
  };
  targetMonth: Date;
  statusCode: StatusType;
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
