import {
  AttendanceApprovalStep,
  ExpenseApprovalStep,
  GroupExpenseApproval,
  MonthlyAttendanceApproval,
  PublicUser,
} from '@/lib/actionTypes';
import { MonthlyAttendanceSummary } from '@/types/attendance';

export type AttendanceApprovalRow = {
  monthlyAttendanceApproval: MonthlyAttendanceApproval;
  attendanceApprovalStep: AttendanceApprovalStep;
  user: PublicUser;
  summary: MonthlyAttendanceSummary;
};

export type ExpenseApprovalRow = {
  groupExpenseApproval: GroupExpenseApproval;
  expenseGroupApprovalStep: ExpenseApprovalStep;
  user: PublicUser;
  totalAmount: number;
  itemCount: number;
  categoryBreakdown: Record<string, { name: string; amount: number; count: number }>;
};
