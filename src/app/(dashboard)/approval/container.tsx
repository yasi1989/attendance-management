import { fetchMonthlyApprovals } from '@/features/approval/services/fetchMonthlyApprovals';
import { StatusTypeWithAll } from '@/types/statusType';
import ApprovalPresentational from './presentational';

type ApprovalContainerProps = {
  year: number;
  month: number;
  status: StatusTypeWithAll;
};

const ApprovalContainer = async ({ year, month, status }: ApprovalContainerProps) => {
  const { attendances, expenses, myCompanyDepartments } = await fetchMonthlyApprovals({ year, month, status });

  return (
    <ApprovalPresentational
      attendances={attendances}
      expenses={expenses}
      myCompanyDepartments={myCompanyDepartments}
      currentYear={year}
      currentMonth={month}
      currentStatus={status}
    />
  );
};

export default ApprovalContainer;
