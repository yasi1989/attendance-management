import { MonthlyAttendanceApprovalType } from './monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalType } from './monthlyExpenseApprovalType';

export type MonthlyApprovalsType = {
  attendances: MonthlyAttendanceApprovalType[];
  expenses: MonthlyExpenseApprovalType[];
};
