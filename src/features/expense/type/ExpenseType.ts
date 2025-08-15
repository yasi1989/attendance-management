import { StatusType } from '@/types/statusType';
import { ExpenseCategoryType } from '@/types/expense';

export type RouteDetail = {
  from: string;
  to: string;
  fare: number;
};

export type ExpenseItem = {
  id: string;
  userId: string;
  expenseDate: Date;
  requestDate: Date;
  amount: number;
  description: string;
  status: StatusType;
  expenseType: ExpenseCategoryType;
  receiptUrl: string;
  routeDetails?: RouteDetail[];
};
