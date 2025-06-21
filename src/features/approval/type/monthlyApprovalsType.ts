import { MonthlyAttendanceApprovalType } from './monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalType } from './monthlyExpenseApprovalType';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';

export type MonthlyApprovalsType = {
  attendances: MonthlyAttendanceApprovalType[];
  expenses: MonthlyExpenseApprovalType[];
  myCompanyDepartments: DepartmentType[];
};
