import { ApprovalStepType } from './approvalStepType';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { UserType } from '@/features/system/users/type/userType';
import { StatusType } from '@/types/statusType';

export type MonthlyAttendanceApprovalItem = {
  id: string;
  userId: string;
  user: UserType & {
    department: DepartmentType;
  };
  statusCode: StatusType;
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
