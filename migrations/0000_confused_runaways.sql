CREATE TABLE "accounts" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "accounts_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "attendance_approval_steps" (
	"id" text PRIMARY KEY NOT NULL,
	"monthly_attendance_approval_id" text NOT NULL,
	"step_order" integer NOT NULL,
	"approver_id" text NOT NULL,
	"status_code" text NOT NULL,
	"approved_at" timestamp,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "attendances" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"monthly_attendance_approval_id" text,
	"work_date" date NOT NULL,
	"start_time" integer,
	"end_time" integer,
	"break_time" integer,
	"attendance_type" text NOT NULL,
	"is_half_day" boolean DEFAULT false,
	"half_day_type" text,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" text PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "departments" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"department_name" text NOT NULL,
	"parent_department_id" text,
	"manager_user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expense_group_approval_steps" (
	"id" text PRIMARY KEY NOT NULL,
	"group_expense_approval_id" text NOT NULL,
	"step_order" integer NOT NULL,
	"approver_id" text NOT NULL,
	"status_code" text NOT NULL,
	"approved_at" timestamp,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"group_expense_approval_id" text,
	"expense_date" date NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"description" text NOT NULL,
	"expense_type" text NOT NULL,
	"receipt_url" text,
	"route_details" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "group_expense_approvals" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"company_id" text NOT NULL,
	"status_code" text NOT NULL,
	"submitted_at" timestamp,
	"purpose" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "group_expense_summaries" (
	"id" text PRIMARY KEY NOT NULL,
	"group_expense_approval_id" text NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"item_count" integer NOT NULL,
	"category_breakdown" jsonb NOT NULL,
	"issues" text[],
	"calculated_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "holidays" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"holiday_date" date NOT NULL,
	"company_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "monthly_attendance_approvals" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"company_id" text NOT NULL,
	"status_code" text NOT NULL,
	"target_month" date NOT NULL,
	"submitted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "monthly_attendance_summaries" (
	"id" text PRIMARY KEY NOT NULL,
	"monthly_attendance_approval_id" text NOT NULL,
	"total_work_days" integer NOT NULL,
	"actual_work_days" integer NOT NULL,
	"total_work_hours" numeric(10, 2) NOT NULL,
	"regular_hours" numeric(10, 2) NOT NULL,
	"overtime_hours" numeric(10, 2) NOT NULL,
	"category_breakdown" jsonb NOT NULL,
	"issues" text[],
	"calculated_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" text PRIMARY KEY NOT NULL,
	"role_code" text NOT NULL,
	"role_name" text NOT NULL,
	"is_personal_role" boolean DEFAULT false NOT NULL,
	"is_system_role" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "roles_role_code_unique" UNIQUE("role_code")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"hashedPassword" text,
	"image" text,
	"company_id" text,
	"department_id" text,
	"role_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_approval_steps" ADD CONSTRAINT "attendance_approval_steps_monthly_attendance_approval_id_monthly_attendance_approvals_id_fk" FOREIGN KEY ("monthly_attendance_approval_id") REFERENCES "public"."monthly_attendance_approvals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_approval_steps" ADD CONSTRAINT "attendance_approval_steps_approver_id_users_id_fk" FOREIGN KEY ("approver_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_monthly_attendance_approval_id_monthly_attendance_approvals_id_fk" FOREIGN KEY ("monthly_attendance_approval_id") REFERENCES "public"."monthly_attendance_approvals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_group_approval_steps" ADD CONSTRAINT "expense_group_approval_steps_group_expense_approval_id_group_expense_approvals_id_fk" FOREIGN KEY ("group_expense_approval_id") REFERENCES "public"."group_expense_approvals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_group_approval_steps" ADD CONSTRAINT "expense_group_approval_steps_approver_id_users_id_fk" FOREIGN KEY ("approver_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_group_expense_approval_id_group_expense_approvals_id_fk" FOREIGN KEY ("group_expense_approval_id") REFERENCES "public"."group_expense_approvals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_expense_approvals" ADD CONSTRAINT "group_expense_approvals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_expense_approvals" ADD CONSTRAINT "group_expense_approvals_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_expense_summaries" ADD CONSTRAINT "group_expense_summaries_group_expense_approval_id_group_expense_approvals_id_fk" FOREIGN KEY ("group_expense_approval_id") REFERENCES "public"."group_expense_approvals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "holidays" ADD CONSTRAINT "holidays_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monthly_attendance_approvals" ADD CONSTRAINT "monthly_attendance_approvals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monthly_attendance_approvals" ADD CONSTRAINT "monthly_attendance_approvals_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monthly_attendance_summaries" ADD CONSTRAINT "monthly_attendance_summaries_monthly_attendance_approval_id_monthly_attendance_approvals_id_fk" FOREIGN KEY ("monthly_attendance_approval_id") REFERENCES "public"."monthly_attendance_approvals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;