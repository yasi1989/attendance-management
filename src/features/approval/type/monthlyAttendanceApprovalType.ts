import { DepartmentType } from '@/features/system/users/type/departmentType';
import { UserType } from '@/features/system/users/type/userType';
import { StatusType } from './statusType';
import { ApprovalStepType } from './approvalStepType';

export type MonthlyAttendanceApprovalType = {
  id: string;
  userId: string;
  user: UserType & {
    department: DepartmentType;
  };
  year: string;
  month: string;
  status: StatusType;
  totalWorkDays: number;
  actualWorkDays: number;
  totalWorkHours: number;
  regularHours: number;
  overtimeHours: number;
  categoryBreakdown: Record<string, { name: string; count: number }>;
  submittedAt: string;
  issues: string[];
  approvalSteps: ApprovalStepType[];
};
