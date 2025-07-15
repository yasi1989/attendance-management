export type ExpenseItem = {
  id: string;
  userId: string;
  requestDate: Date;
  targetMonth: Date;
  expenseType: ExpenseType;
  routeInfo?: RouteInfoItem;
  amount: number;
  description?: string;
  statusCode: string;
  receiptUrl?: string;
};

export type RouteInfoItem = {
  id: string;
  expenseRequestId: string;
  routeDetails: { from: string; to: string; fare: number }[];
};

export type ExpenseType = 'All' | 'Transport' | 'General';
