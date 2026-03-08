import { Department } from '@/lib/actionTypes';
import { MonthlyAttendanceApprovalItem } from './monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalItem } from './monthlyExpenseApprovalType';

export type MonthlyApprovalsType = {
  attendances: MonthlyAttendanceApprovalItem[];
  expenses: MonthlyExpenseApprovalItem[];
  myCompanyDepartments: Department[];
};
