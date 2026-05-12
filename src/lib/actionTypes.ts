import { InferSelectModel } from 'drizzle-orm';
import {
  attendanceApprovalSteps,
  attendances,
  companies,
  departments,
  expenseGroupApprovalSteps,
  expenses,
  groupExpenseApprovals,
  holidays,
  monthlyAttendanceApprovals,
  roles,
  users,
} from './db/schema';

export type ActionStateResult = {
  error?: string | undefined;
  success: boolean;
};

export type Company = InferSelectModel<typeof companies>;
export type User = InferSelectModel<typeof users>;
export type PublicUser = Omit<User, 'hashedPassword' | 'emailVerified'>;
export type PublicUserWithRole = PublicUser & { role: Role };
export type Role = InferSelectModel<typeof roles>;
export type Department = InferSelectModel<typeof departments>;
export type Holiday = InferSelectModel<typeof holidays>;
export type Attendance = InferSelectModel<typeof attendances>;
export type MonthlyAttendanceApproval = InferSelectModel<typeof monthlyAttendanceApprovals>;
export type Expense = InferSelectModel<typeof expenses>;
export type GroupExpenseApproval = InferSelectModel<typeof groupExpenseApprovals>;
export type ExpenseWithApproval = Expense & { groupExpenseApproval: GroupExpenseApproval | null };
export type AttendanceApprovalStep = InferSelectModel<typeof attendanceApprovalSteps>;
export type ExpenseApprovalStep = InferSelectModel<typeof expenseGroupApprovalSteps>;
