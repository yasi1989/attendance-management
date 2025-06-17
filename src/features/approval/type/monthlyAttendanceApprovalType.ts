import { DepartmentType } from "@/features/system-admin/users/type/departmentType";
import { UserType } from "@/features/system-admin/users/type/userType";
import { StatusType } from "./statusType";
import { AttendanceCategoryType } from "./attendanceCategoryType";

export type MonthlyAttendanceApprovalType = {
  id: string;
  userId: string;
  user: UserType & {
    department: DepartmentType;
  };
  month: string;
  attendanceCategories: AttendanceCategoryType[];
  status: StatusType;
  totalWorkDays: number;
  actualWorkDays: number;
  totalWorkHours: number;
  regularHours: number;
  overtimeHours: number;
  categoryBreakdown: Record<string, number>;
  submittedAt: string;
  issues: string[];
  approvalOrder: number;
  totalSteps: number;
};
