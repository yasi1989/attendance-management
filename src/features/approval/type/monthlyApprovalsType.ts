import { DepartmentType } from '@/features/system/users/type/departmentType';
import { MonthlyAttendanceApprovalItem } from './monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalItem } from './monthlyExpenseApprovalType';

export type MonthlyApprovalsType = {
  attendances: MonthlyAttendanceApprovalItem[];
  expenses: MonthlyExpenseApprovalItem[];
  myCompanyDepartments: DepartmentType[];
};
