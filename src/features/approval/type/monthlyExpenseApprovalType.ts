import { ExpenseCategoryType } from "@/features/expense/history/type/expenseCategoryType";
import { ExpenseType, RouteInfoType } from "@/features/expense/history/type/expenseType";
import { DepartmentType } from "@/features/system-admin/users/type/departmentType";
import { UserType } from "@/features/system-admin/users/type/userType";
import { StatusType } from "./statusType";

export type MonthlyExpenseApprovalType = {
  id: string;
  userId: string;
  user: UserType & {
    department: DepartmentType;
  };
  month: string;
  expenseRecords: ExpenseType[];
  expenseCategories: ExpenseCategoryType[];
  routeInfos: RouteInfoType[];
  status: StatusType;
  totalAmount: number;
  itemCount: number;
  categoryBreakdown: Record<string, { amount: number; count: number }>;
  submittedAt: string;
  issues: string[];
  approvalOrder: number;
  totalSteps: number;
};