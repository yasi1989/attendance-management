import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useIndividualApproval } from '../../hooks/useApprovalForm';
import { Button } from '@/components/ui/button';
import { MonthlyAttendanceApprovalItem } from '../../type/monthlyAttendanceApprovalType';
import { IndividualApprovalType } from '../../lib/formSchema';
import { Form } from '@/components/ui/form';
import { useTransition } from 'react';
import { StatusType } from '@/types/statusType';
import { DataTable } from '@/components/table/DataTable';
import { columns } from '../../components/ApprovalStepsColumn';
import ApprovalActions from './ApprovalActions';
import DialogHeaderWithClose from '@/components/dialog/DialogHeaderWithClose';
import { STATUS } from '@/consts/status';
import { useDialogState } from '@/hooks/useDialogState';

type AttendanceDetailDialogProps = {
  status: StatusType;
  attendance: MonthlyAttendanceApprovalItem;
};

export const AttendanceDetailDialog = ({ status, attendance }: AttendanceDetailDialogProps) => {
  const [isSubmitted, startTransition] = useTransition();
  const { form, handleIndividualApproval } = useIndividualApproval(
    attendance.id,
    async (approvalData: IndividualApprovalType) => {
      startTransition(async () => {
        console.log(approvalData);
      });
    },
  );

  const { open, handleOpenChange, handleCloseButtonClick } = useDialogState({
    form,
  });

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            詳細
          </Button>
        </DialogTrigger>
        <DialogContent className="[&>button]:hidden w-full sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
          <form>
            <DialogHeaderWithClose
              title={`${attendance.user.lastName}${attendance.user.firstName} (${attendance.targetMonth.getFullYear()}年${attendance.targetMonth.getMonth() + 1}月)`}
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
                        {attendance.actualWorkDays}/{attendance.totalWorkDays}日
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>総労働時間:</span>
                      <span>{attendance.totalWorkHours}時間</span>
                    </div>
                    <div className="flex justify-between">
                      <span>残業時間:</span>
                      <span className={attendance.overtimeHours > 15 ? 'text-red-600 font-medium' : ''}>
                        {attendance.overtimeHours}時間
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm sm:text-base">勤怠内訳</h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded space-y-1 text-sm">
                    {Object.entries(attendance.categoryBreakdown).map(([category, item]) => (
                      <div key={category} className="flex justify-between">
                        <span>{item.name}:</span>
                        <span>{item.count}日</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {attendance.issues?.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">注意事項</h4>
                  <ul className="space-y-1 text-sm">
                    {attendance.issues.includes('excessive_overtime') && (
                      <li className="text-red-600 dark:text-red-400">⚠ 残業時間が15時間を超えています</li>
                    )}
                    {attendance.issues.includes('insufficient_hours') && (
                      <li className="text-yellow-600 dark:text-yellow-400">⚠ 所定労働時間に達していません</li>
                    )}
                  </ul>
                </div>
              )}

              {status === STATUS.SUBMITTED.value && (
                <ApprovalActions
                  form={form}
                  handleIndividualApproval={(status) => handleIndividualApproval(status)}
                  isSubmitted={isSubmitted}
                />
              )}

              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <DataTable columns={columns} data={attendance.approvalSteps} />
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};
