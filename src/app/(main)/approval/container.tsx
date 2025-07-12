import { fetchMonthlyApprovals } from '@/features/approval/services/fetchMonthlyApprovals';
import { StatusType } from '@/types/statusType';
import ApprovalPresentational from './presentational';

type ApprovalContainerProps = {
  year: number;
  month: number;
  status: StatusType;
};

const ApprovalContainer = async ({ year, month, status }: ApprovalContainerProps) => {
  const { attendances, expenses, myCompanyDepartments } = await fetchMonthlyApprovals({ year, month, status });

  return (
    <ApprovalPresentational
      status={status}
      attendances={attendances}
      expenses={expenses}
      myCompanyDepartments={myCompanyDepartments}
    />
  );
};

export default ApprovalContainer;
