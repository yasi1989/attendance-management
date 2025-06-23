import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useIndividualApproval } from '../../hooks/useApprovalForm';
import { Button } from '@/components/ui/button';
import { MonthlyAttendanceApprovalType } from '../../type/monthlyAttendanceApprovalType';
import { IndividualApprovalType } from '../../lib/formSchema';
import { Form } from '@/components/ui/form';
import { useTransition } from 'react';
import { StatusType } from '@/types/statusType';
import ApprovalActions from './ApprovalActions';
import { DataTable } from '@/components/DataTable';
import { columns } from '../../components/ApprovalStepsColumn';

type AttendanceDetailDialogProps = {
  status: StatusType;
  attendance: MonthlyAttendanceApprovalType;
};

export const AttendanceDetailDialog = ({ status, attendance }: AttendanceDetailDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const { form, handleIndividualApproval } = useIndividualApproval(
    attendance.id,
    async (approvalData: IndividualApprovalType) => {
      startTransition(async () => {
        console.log(approvalData);
      });
    },
  );

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            詳細
          </Button>
        </DialogTrigger>
        <DialogContent  className="min-w-3xl max-w-3xl">
          <form>
            <DialogHeader>
              <DialogTitle>
                {attendance.user.lastName}
                {attendance.user.firstName} ({attendance.year}年{attendance.month}月)
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <h4 className="font-medium">勤務実績</h4>
                  <div className="bg-gray-50 p-3 rounded space-y-1 text-sm">
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
                  <h4 className="font-medium">勤怠内訳</h4>
                  <div className="bg-blue-50 p-3 rounded space-y-1 text-sm">
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
                <div className="bg-yellow-50 p-3 rounded">
                  <h4 className="font-medium text-yellow-800 mb-2">注意事項</h4>
                  <ul className="space-y-1 text-sm">
                    {attendance.issues.includes('excessive_overtime') && (
                      <li className="text-red-600">⚠ 残業時間が15時間を超えています</li>
                    )}
                    {attendance.issues.includes('insufficient_hours') && (
                      <li className="text-yellow-600">⚠ 所定労働時間に達していません</li>
                    )}
                  </ul>
                </div>
              )}

              {status === 'Pending' && (
                <ApprovalActions
                  form={form}
                  handleIndividualApproval={(status) => handleIndividualApproval(status)}
                  isPending={isPending}
                />
              )}

              <DataTable columns={columns} data={attendance.approvalSteps} />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};
