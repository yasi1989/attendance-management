export type ExpenseType = {
  id: string;
  user_id: string;
  request_date: string;
  expenseType: string;
  amount: number;
  description: string;
  status_id: string;
  receipt_url: string;
};

export type RouteInfoType = {
  id: string;
  expense_request_id: string;
  route_details: { from: string; to: string; fare: number }[];
};
