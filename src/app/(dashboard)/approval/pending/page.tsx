import MonthlyApprovalForm from '@/features/approval/components/MonthlyApprovalForm';
import { fetchMonthlyApprovals } from '@/features/approval/services/fetchMonthlyApprovals';

const PendingApprovalPage = () => {
  const { attendances, expenses } = fetchMonthlyApprovals({ status: 'Pending' });
  return <MonthlyApprovalForm status="Pending" attendances={attendances} expenses={expenses} />;
};

export default PendingApprovalPage;
