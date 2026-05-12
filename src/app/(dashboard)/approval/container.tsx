import {
  fetchApprovalDepartments,
  fetchAttendanceApprovals,
  fetchExpenseApprovals,
} from '@/features/approval/api/fetches';
import { StatusTypeWithAll } from '@/types/statusType';
import ApprovalPresentational from './presentational';

type ApprovalContainerProps = {
  year: number;
  month: number;
  status: StatusTypeWithAll;
};

const ApprovalContainer = async ({ year, month, status }: ApprovalContainerProps) => {
  const [attendanceResult, expenseResult, departmentResult] = await Promise.all([
    fetchAttendanceApprovals(year, month, status),
    fetchExpenseApprovals(year, month, status),
    fetchApprovalDepartments(),
  ]);

  if (!attendanceResult.success) throw attendanceResult.error;
  if (!expenseResult.success) throw expenseResult.error;
  if (!departmentResult.success) throw departmentResult.error;

  return (
    <ApprovalPresentational
      attendances={attendanceResult.data}
      expenses={expenseResult.data}
      myCompanyDepartments={departmentResult.data}
      currentYear={year}
      currentMonth={month}
      currentStatus={status}
    />
  );
};

export default ApprovalContainer;
