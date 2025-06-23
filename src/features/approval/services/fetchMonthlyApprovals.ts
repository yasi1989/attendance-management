import { sampleMonthlyApprovals } from '../const/mockData';
import { MonthlyApprovalsType } from '../type/monthlyApprovalsType';
import { StatusType } from '@/types/statusType';

type FetchMonthlyApprovalsParams = {
  status: StatusType;
};

export const fetchMonthlyApprovals = ({ status }: FetchMonthlyApprovalsParams): MonthlyApprovalsType => {
  return {
    attendances: sampleMonthlyApprovals.attendances.filter((attendance) => attendance.status.statusCode === status),
    expenses: sampleMonthlyApprovals.expenses.filter((expense) => expense.status.statusCode === status),
    myCompanyDepartments: sampleMonthlyApprovals.myCompanyDepartments,
  };
};
