import { InferSelectModel } from 'drizzle-orm';
import {
  attendances,
  companies,
  departments,
  holidays,
  monthlyAttendanceApprovals,
  monthlyAttendanceSummaries,
  roles,
  users,
} from './db/schema';

export type ActionStateResult = {
  error?: string | undefined;
  success: boolean;
};

export type Company = InferSelectModel<typeof companies>;
export type User = InferSelectModel<typeof users>;
export type Role = InferSelectModel<typeof roles>;
export type Department = InferSelectModel<typeof departments>;
export type Holiday = InferSelectModel<typeof holidays>;
export type Attendance = InferSelectModel<typeof attendances>;
export type MonthlyAttendanceApproval = InferSelectModel<typeof monthlyAttendanceApprovals>;
export type MonthlyAttendanceSummary = InferSelectModel<typeof monthlyAttendanceSummaries>;
