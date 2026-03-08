import { UserType } from '@/features/system/users/type/userType';
import { Department } from '@/lib/actionTypes';
import { StatusType } from '@/types/statusType';
import { ApprovalStepType } from './approvalStepType';

export type MonthlyAttendanceApprovalItem = {
  id: string;
  userId: string;
  user: UserType & {
    department: Department;
  };
  status: StatusType;
  targetMonth: Date;
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

export type AttendanceApprovalData = {
  attendances: MonthlyAttendanceApprovalItem[];
};
