import { sampleMonthlyApprovals } from '../const/mockData';
import { StatusType } from '@/types/statusType';
import { MonthlyAttendanceApprovalItem } from '../type/monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalItem } from '../type/monthlyExpenseApprovalType';
import { DepartmentType } from '@/features/system/users/type/departmentType';

type FetchMonthlyApprovalsParams = {
  year: number;
  month: number;
  status: StatusType;
};

export type FetchMonthlyApprovalsResponse = {
  attendances: MonthlyAttendanceApprovalItem[];
  expenses: MonthlyExpenseApprovalItem[];
  myCompanyDepartments: DepartmentType[];
};

const getFixedData = <T extends MonthlyAttendanceApprovalItem | MonthlyExpenseApprovalItem>(
  data: T[],
  year: number,
  month: number,
  status: StatusType,
) => {
  if (status === 'All') {
    return data.filter((item) => filterByYearMonth(item.targetMonth, year, month));
  }
  return data.filter((item) => filterByYearMonth(item.targetMonth, year, month) && item.status.statusCode === status);
};

const filterByYearMonth = (targetDate: Date, year: number, month: number): boolean => {
  return targetDate.getFullYear() === year && targetDate.getMonth() + 1 === month;
};

export const fetchMonthlyApprovals = async ({
  year,
  month,
  status,
}: FetchMonthlyApprovalsParams): Promise<FetchMonthlyApprovalsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    attendances: getFixedData(sampleMonthlyApprovals.attendances, year, month, status),
    expenses: getFixedData(sampleMonthlyApprovals.expenses, year, month, status),
    myCompanyDepartments: sampleMonthlyApprovals.myCompanyDepartments,
  };
};
