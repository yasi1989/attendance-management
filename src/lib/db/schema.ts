import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  decimal,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

export type StatusType = 'Draft' | 'Submitted' | 'Approved' | 'Rejected';

export const companies = pgTable('companies', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  companyName: text('company_name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const departments = pgTable('departments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  companyId: text('company_id')
    .notNull()
    .references(() => companies.id, { onDelete: 'cascade' }),
  departmentName: text('department_name').notNull(),
  parentDepartmentId: text('parent_department_id'),
  managerUserId: text('manager_user_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const roles = pgTable('roles', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  roleCode: text('role_code').notNull().unique(),
  roleName: text('role_name').notNull(),
  isPersonalRole: boolean('is_personal_role').notNull().default(false),
  isSystemRole: boolean('is_system_role').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  hashedPassword: text('hashedPassword'),
  image: text('image'),
  companyId: text('company_id').references(() => companies.id),
  departmentId: text('department_id').references(() => departments.id),
  roleId: text('role_id').references(() => roles.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const accounts = pgTable(
  'accounts',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const holidays = pgTable('holidays', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  holidayDate: date('holiday_date').notNull(),
  companyId: text('company_id')
    .notNull()
    .references(() => companies.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const monthlyAttendanceApprovals = pgTable('monthly_attendance_approvals', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  companyId: text('company_id')
    .notNull()
    .references(() => companies.id, { onDelete: 'cascade' }),
  statusCode: text('status_code', {
    enum: ['Draft', 'Submitted', 'Approved', 'Rejected'],
  }).notNull(),
  targetMonth: date('target_month').notNull(),
  submittedAt: timestamp('submitted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const attendances = pgTable('attendances', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  monthlyAttendanceApprovalId: text('monthly_attendance_approval_id').references(() => monthlyAttendanceApprovals.id, {
    onDelete: 'cascade',
  }),
  workDate: date('work_date').notNull(),
  startTime: integer('start_time'),
  endTime: integer('end_time'),
  breakTime: integer('break_time'),
  attendanceType: text('attendance_type', {
    enum: ['Work', 'Paid', 'Absence', 'Special'],
  }).notNull(),
  isHalfDay: boolean('is_half_day').default(false),
  halfDayType: text('half_day_type', {
    enum: ['Am', 'Pm'],
  }),
  comment: text('comment'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const monthlyAttendanceSummaries = pgTable('monthly_attendance_summaries', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  monthlyAttendanceApprovalId: text('monthly_attendance_approval_id')
    .notNull()
    .references(() => monthlyAttendanceApprovals.id, { onDelete: 'cascade' }),
  totalWorkDays: integer('total_work_days').notNull(),
  actualWorkDays: integer('actual_work_days').notNull(),
  totalWorkHours: decimal('total_work_hours', { precision: 10, scale: 2 }).notNull(),
  regularHours: decimal('regular_hours', { precision: 10, scale: 2 }).notNull(),
  overtimeHours: decimal('overtime_hours', { precision: 10, scale: 2 }).notNull(),
  categoryBreakdown: jsonb('category_breakdown').notNull(),
  issues: text('issues').array(),
  calculatedAt: timestamp('calculated_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const groupExpenseApprovals = pgTable('group_expense_approvals', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  companyId: text('company_id')
    .notNull()
    .references(() => companies.id, { onDelete: 'cascade' }),
  statusCode: text('status_code', {
    enum: ['Draft', 'Submitted', 'Approved', 'Rejected'],
  }).notNull(),
  submittedAt: timestamp('submitted_at'),
  purpose: text('purpose'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const expenses = pgTable('expenses', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  groupExpenseApprovalId: text('group_expense_approval_id').references(() => groupExpenseApprovals.id, {
    onDelete: 'cascade',
  }),
  expenseDate: date('expense_date').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  description: text('description').notNull(),
  expenseType: text('expense_type', {
    enum: ['Transport', 'General'],
  }).notNull(),
  receiptUrl: text('receipt_url'),
  routeDetails: jsonb('route_details'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const groupExpenseSummaries = pgTable('group_expense_summaries', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  groupExpenseApprovalId: text('group_expense_approval_id')
    .notNull()
    .references(() => groupExpenseApprovals.id, { onDelete: 'cascade' }),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  itemCount: integer('item_count').notNull(),
  categoryBreakdown: jsonb('category_breakdown').notNull(),
  issues: text('issues').array(),
  calculatedAt: timestamp('calculated_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const attendanceApprovalSteps = pgTable('attendance_approval_steps', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  monthlyAttendanceApprovalId: text('monthly_attendance_approval_id')
    .notNull()
    .references(() => monthlyAttendanceApprovals.id, { onDelete: 'cascade' }),
  stepOrder: integer('step_order').notNull(),
  approverId: text('approver_id')
    .notNull()
    .references(() => users.id),
  statusCode: text('status_code', {
    enum: ['Draft', 'Submitted', 'Approved', 'Rejected'],
  }).notNull(),
  approvedAt: timestamp('approved_at'),
  comment: text('comment'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const expenseGroupApprovalSteps = pgTable('expense_group_approval_steps', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  groupExpenseApprovalId: text('group_expense_approval_id')
    .notNull()
    .references(() => groupExpenseApprovals.id, { onDelete: 'cascade' }),
  stepOrder: integer('step_order').notNull(),
  approverId: text('approver_id')
    .notNull()
    .references(() => users.id),
  statusCode: text('status_code', {
    enum: ['Draft', 'Submitted', 'Approved', 'Rejected'],
  }).notNull(),
  approvedAt: timestamp('approved_at'),
  comment: text('comment'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const companiesRelations = relations(companies, ({ many }) => ({
  departments: many(departments),
  users: many(users),
  holidays: many(holidays),
  monthlyAttendanceApprovals: many(monthlyAttendanceApprovals),
  groupExpenseApprovals: many(groupExpenseApprovals),
}));

export const departmentsRelations = relations(departments, ({ one, many }) => ({
  company: one(companies, {
    fields: [departments.companyId],
    references: [companies.id],
  }),
  parentDepartment: one(departments, {
    fields: [departments.parentDepartmentId],
    references: [departments.id],
    relationName: 'department_hierarchy',
  }),
  childDepartments: many(departments, {
    relationName: 'department_hierarchy',
  }),
  users: many(users),
  manager: one(users, {
    fields: [departments.managerUserId],
    references: [users.id],
    relationName: 'department_manager',
  }),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.id],
  }),
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  managedDepartments: many(departments, {
    relationName: 'department_manager',
  }),
  accounts: many(accounts),
  sessions: many(sessions),
  attendances: many(attendances),
  expenses: many(expenses),
  monthlyAttendanceApprovals: many(monthlyAttendanceApprovals),
  groupExpenseApprovals: many(groupExpenseApprovals),
  attendanceApprovalSteps: many(attendanceApprovalSteps),
  expenseGroupApprovalSteps: many(expenseGroupApprovalSteps),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const holidaysRelations = relations(holidays, ({ one }) => ({
  company: one(companies, {
    fields: [holidays.companyId],
    references: [companies.id],
  }),
}));

export const attendancesRelations = relations(attendances, ({ one }) => ({
  user: one(users, {
    fields: [attendances.userId],
    references: [users.id],
  }),
  monthlyAttendanceApproval: one(monthlyAttendanceApprovals, {
    fields: [attendances.monthlyAttendanceApprovalId],
    references: [monthlyAttendanceApprovals.id],
  }),
}));

export const expensesRelations = relations(expenses, ({ one }) => ({
  user: one(users, {
    fields: [expenses.userId],
    references: [users.id],
  }),
  groupExpenseApproval: one(groupExpenseApprovals, {
    fields: [expenses.groupExpenseApprovalId],
    references: [groupExpenseApprovals.id],
  }),
}));

export const monthlyAttendanceApprovalsRelations = relations(monthlyAttendanceApprovals, ({ one, many }) => ({
  user: one(users, {
    fields: [monthlyAttendanceApprovals.userId],
    references: [users.id],
  }),
  company: one(companies, {
    fields: [monthlyAttendanceApprovals.companyId],
    references: [companies.id],
  }),
  attendances: many(attendances),
  summary: one(monthlyAttendanceSummaries),
  approvalSteps: many(attendanceApprovalSteps),
}));

export const monthlyAttendanceSummariesRelations = relations(monthlyAttendanceSummaries, ({ one }) => ({
  monthlyAttendanceApproval: one(monthlyAttendanceApprovals, {
    fields: [monthlyAttendanceSummaries.monthlyAttendanceApprovalId],
    references: [monthlyAttendanceApprovals.id],
  }),
}));

export const groupExpenseApprovalsRelations = relations(groupExpenseApprovals, ({ one, many }) => ({
  user: one(users, {
    fields: [groupExpenseApprovals.userId],
    references: [users.id],
  }),
  company: one(companies, {
    fields: [groupExpenseApprovals.companyId],
    references: [companies.id],
  }),
  expenses: many(expenses),
  summary: one(groupExpenseSummaries),
  approvalSteps: many(expenseGroupApprovalSteps),
}));

export const groupExpenseSummariesRelations = relations(groupExpenseSummaries, ({ one }) => ({
  groupExpenseApproval: one(groupExpenseApprovals, {
    fields: [groupExpenseSummaries.groupExpenseApprovalId],
    references: [groupExpenseApprovals.id],
  }),
}));

export const attendanceApprovalStepsRelations = relations(attendanceApprovalSteps, ({ one }) => ({
  monthlyAttendanceApproval: one(monthlyAttendanceApprovals, {
    fields: [attendanceApprovalSteps.monthlyAttendanceApprovalId],
    references: [monthlyAttendanceApprovals.id],
  }),
  approver: one(users, {
    fields: [attendanceApprovalSteps.approverId],
    references: [users.id],
  }),
}));

export const expenseGroupApprovalStepsRelations = relations(expenseGroupApprovalSteps, ({ one }) => ({
  groupExpenseApproval: one(groupExpenseApprovals, {
    fields: [expenseGroupApprovalSteps.groupExpenseApprovalId],
    references: [groupExpenseApprovals.id],
  }),
  approver: one(users, {
    fields: [expenseGroupApprovalSteps.approverId],
    references: [users.id],
  }),
}));

// export const userEmailIndex = index('user_email_idx').on(users.email);
// export const attendanceUserDateIndex = index('attendance_user_date_idx').on(attendances.userId, attendances.workDate);
// export const attendanceMonthlyApprovalIndex = index('attendance_monthly_approval_idx').on(
//   attendances.monthlyAttendanceApprovalId,
// );
// export const expenseUserDateIndex = index('expense_user_date_idx').on(expenses.userId, expenses.expenseDate);
// export const expenseGroupApprovalIndex = index('expense_group_approval_idx').on(expenses.groupExpenseApprovalId);
// export const monthlyAttendanceCompanyStatusIndex = index('monthly_attendance_company_status_idx').on(
//   monthlyAttendanceApprovals.companyId,
//   monthlyAttendanceApprovals.statusCode,
// );
// export const groupExpenseCompanyStatusIndex = index('group_expense_company_status_idx').on(
//   groupExpenseApprovals.companyId,
//   groupExpenseApprovals.statusCode,
// );
