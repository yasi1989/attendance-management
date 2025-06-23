import { MonthlyAttendanceApprovalType } from './monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalType } from './monthlyExpenseApprovalType';
import { DepartmentType } from '@/features/system/users/type/departmentType';

export type MonthlyApprovalsType = {
  attendances: MonthlyAttendanceApprovalType[];
  expenses: MonthlyExpenseApprovalType[];
  myCompanyDepartments: DepartmentType[];
};
