import { StatusType } from '@/types/statusType';

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
  expenseType: ExpenseTypeDB;
  receiptUrl: string;
  routeDetails?: RouteDetail[];
};

export type ExpenseTypeDB = 'Transport' | 'General';
export type ExpenseTypeFilter = ExpenseTypeDB | 'All';
