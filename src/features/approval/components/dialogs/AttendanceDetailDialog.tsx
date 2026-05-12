import { useTransition } from 'react';
import DialogHeaderWithClose from '@/components/dialog/DialogHeaderWithClose';
import { DataTable } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ATTENDANCES } from '@/consts/attendance';
import { STATUS } from '@/consts/status';
import { useDialogState } from '@/hooks/useDialogState';
import { useIndividualApproval } from '../../hooks/useApprovalForm';
import { approvalStepsColumns } from '../../table/ApprovalStepsColumn';
import { AttendanceApprovalRow } from '../../type/approvalType';
import ApprovalActions from './ApprovalActions';

type AttendanceDetailDialogProps = {
  status: string;
  attendance: AttendanceApprovalRow;
};

export const AttendanceDetailDialog = ({ status, attendance }: AttendanceDetailDialogProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const { form, handleApproval } = useIndividualApproval(
    attendance.attendanceApprovalStep.id,
    async (action, comment) => {
      startTransition(async () => {
        console.log(action, comment);
      });
    },
  );

  const { open, handleOpenChange, handleCloseButtonClick } = useDialogState({ form });

  const approval = attendance.monthlyAttendanceApproval;
  const summary = attendance.summary;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          詳細
        </Button>
      </DialogTrigger>
      <DialogContent className="[&>button]:hidden w-full sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <form>
          <DialogHeaderWithClose
            title={`${attendance.user.name} (${new Date(approval.targetMonth).getFullYear()}年${new Date(approval.targetMonth).getMonth() + 1}月)`}
            onClose={handleCloseButtonClick}
          />
          <div className="flex flex-col space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm sm:text-base">勤務実績</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>出勤日数:</span>
                    <span>
                      {summary.actualWorkDays}/{summary.totalWorkDays}日
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>総労働時間:</span>
                    <span>{summary.totalWorkHours}時間</span>
                  </div>
                  <div className="flex justify-between">
                    <span>残業時間:</span>
                    <span className={parseFloat(summary.overtimeHours) > 15 ? 'text-red-600 font-medium' : ''}>
                      {summary.overtimeHours}時間
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm sm:text-base">勤怠内訳</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded space-y-1 text-sm">
                  {Object.entries(summary.categoryBreakdown).map(([category, count]) => {
                    const label = Object.values(ATTENDANCES).find((a) => a.value === category)?.label ?? category;
                    return (
                      <div key={category} className="flex justify-between">
                        <span>{label}:</span>
                        <span>{count}日</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {summary.issues && summary.issues.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">注意事項</h4>
                <ul className="space-y-1 text-sm">
                  {summary.issues.map((issue) => (
                    <li key={issue} className="text-yellow-600 dark:text-yellow-400">
                      ⚠ {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {status === STATUS.SUBMITTED.value && (
              <ApprovalActions
                form={form}
                handleIndividualApproval={(action) => handleApproval(action)}
                isSubmitted={isSubmitted}
              />
            )}

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <DataTable columns={approvalStepsColumns} data={[attendance.attendanceApprovalStep]} />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
