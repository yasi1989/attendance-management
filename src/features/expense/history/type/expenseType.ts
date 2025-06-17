export type ExpenseType = {
  id: string;
  userId: string;
  requestDate: Date;
  expenseCategoryId: string;
  amount: number;
  description: string;
  statusId: string;
  receiptUrl: string;
};

export type RouteInfoType = {
  id: string;
  expenseRequestId: string;
  routeDetails: { from: string; to: string; fare: number }[];
};
