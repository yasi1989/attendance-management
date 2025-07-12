import { MonthlyAttendanceApprovalItem } from './monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalItem } from './monthlyExpenseApprovalType';
import { DepartmentType } from '@/features/system/users/type/departmentType';

export type MonthlyApprovalsType = {
  attendances: MonthlyAttendanceApprovalItem[];
  expenses: MonthlyExpenseApprovalItem[];
  myCompanyDepartments: DepartmentType[];
};
