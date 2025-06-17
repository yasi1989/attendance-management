import { sampleMonthlyApprovals } from '../const/mockData';
import { MonthlyApprovalsType } from '../type/monthlyApprovalsType';

type FetchMonthlyApprovalsParams = {
  status: 'Pending' | 'Approved';
};

export const fetchMonthlyApprovals = ({ status }: FetchMonthlyApprovalsParams): MonthlyApprovalsType => {
  return {
    attendances: sampleMonthlyApprovals.attendances.filter((attendance) => attendance.status.statusCode === status),
    expenses: sampleMonthlyApprovals.expenses.filter((expense) => expense.status.statusCode === status),
  };
};
