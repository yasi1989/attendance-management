import { StatusType } from '@/types/statusType';

export type RouteDetail = {
  from: string;
  to: string;
  fare: number;
};

export type RouteInfo = {
  id: string;
  expenseRequestId: string;
  routeDetails: RouteDetail[];
};

export type ExpenseItem = {
  id: string;
  userId: string;
  expenseDate: Date;
  requestDate: Date;
  amount: number;
  description: string;
  statusCode: StatusType;
  expenseType: ExpenseTypeDB;
  receiptUrl: string;
  routeInfo?: RouteInfo;
};

export type ExpenseTypeDB = 'Transport' | 'General';
export type ExpenseTypeFilter = ExpenseTypeDB | 'All';
