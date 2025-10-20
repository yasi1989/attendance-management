import { sampleMonthlyApprovals } from '../const/mockData';
import { StatusTypeWithAll } from '@/types/statusType';
import { MonthlyAttendanceApprovalItem } from '../type/monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalItem } from '../type/monthlyExpenseApprovalType';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { STATUS_WITH_ALL } from '@/consts/status';

type FetchMonthlyApprovalsParams = {
  year: number;
  month: number;
  status: StatusTypeWithAll;
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
  status: StatusTypeWithAll,
) => {
  if (status === STATUS_WITH_ALL.ALL.value) {
    return data.filter((item) => filterByYearMonth(item.targetMonth, year, month));
  }
  return data.filter((item) => filterByYearMonth(item.targetMonth, year, month) && item.status === status);
};

const filterByYearMonth = (targetDate: Date, year: number, month: number): boolean => {
  return targetDate.getFullYear() === year && targetDate.getMonth() + 1 === month;
};

export const fetchMonthlyApprovals = async ({
  year,
  month,
  status,
}: FetchMonthlyApprovalsParams): Promise<FetchMonthlyApprovalsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    attendances: getFixedData(sampleMonthlyApprovals.attendances, year, month, status),
    expenses: getFixedData(sampleMonthlyApprovals.expenses, year, month, status),
    myCompanyDepartments: sampleMonthlyApprovals.myCompanyDepartments,
  };
};
