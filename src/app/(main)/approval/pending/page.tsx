import MonthlyApprovalForm from '@/features/approval/components/MonthlyApprovalForm';
import { fetchMonthlyApprovals } from '@/features/approval/services/fetchMonthlyApprovals';

const PendingApprovalPage = () => {
  const status = 'Pending';
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

export default PendingApprovalPage;
