import { expenseData, routeInfoData } from '../history/const/mockData';
import { ExpenseType, RouteInfoType } from '../history/type/expenseType';

export const fetchExpenseById = (id: string): ExpenseType | undefined => {
  return expenseData.find((expense) => expense.id === id);
};

export const fetchRouteInfoById = (id: string): RouteInfoType | undefined => {
  return routeInfoData.find((routeInfo) => routeInfo.expense_request_id === id);
};
