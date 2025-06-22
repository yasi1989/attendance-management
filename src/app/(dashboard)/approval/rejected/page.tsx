import MonthlyApprovalForm from '@/features/approval/components/MonthlyApprovalForm';
import { fetchMonthlyApprovals } from '@/features/approval/services/fetchMonthlyApprovals';

const RejectedApprovalPage = () => {
  const status = 'Rejected';
  const { attendances, expenses, myCompanyDepartments } = fetchMonthlyApprovals({ status });
  return (
    <MonthlyApprovalForm
      status={status}
      attendances={attendances}
      expenses={expenses}
      myCompanyDepartments={myCompanyDepartments}
    />
  );
};

export default RejectedApprovalPage;
