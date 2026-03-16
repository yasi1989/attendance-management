import { isSaturday, isSunday } from 'date-fns';
import DialogActionFooter from '@/components/dialog/DialogActionFooter';
import DialogHeaderWithClose from '@/components/dialog/DialogHeaderWithClose';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useDialogState } from '@/hooks/useDialogState';
import { Attendance, Holiday } from '@/lib/actionTypes';
import { useAttendance, useDeleteAttendance } from '../hooks/useAttendance';
import AttendanceFormFields from './AttendanceFormField';
import AttendanceStatusInformation from './AttendanceStatusInformation';

type AttendanceDialogProps = {
  day: Date;
  attendanceData?: Attendance;
  holidayInfo?: Holiday;
  isAttendanceEditLocked?: boolean;
  triggerContent?: React.ReactElement;
};

const AttendanceDialog = ({
  day,
  attendanceData,
  holidayInfo,
  triggerContent,
  isAttendanceEditLocked,
}: AttendanceDialogProps) => {
  const isWeekend = isSaturday(day) || isSunday(day);

  const {
    form,
    onSubmit,
    resetAttendanceForm,
    resetHalfDayForm,
    attendanceType,
    isHalfDay,
    resetToDefault,
    isPending,
  } = useAttendance({ day, attendanceData, isDisabled: isAttendanceEditLocked });

  const { open, handleOpenChange, handleCloseButtonClick } = useDialogState({ form });
  const { onDelete, isDeletePending } = useDeleteAttendance(attendanceData?.id ?? '');

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div>{triggerContent}</div>
      </DialogTrigger>

      <DialogContent className="[&>button]:hidden w-full sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <DialogHeaderWithClose title="勤怠申請" onClose={handleCloseButtonClick} />

            <Card>
              <CardHeader>
                <AttendanceStatusInformation
                  holidayInfo={holidayInfo}
                  isWeekend={isWeekend}
                  isDisabled={isAttendanceEditLocked}
                />
              </CardHeader>
              <CardContent>
                <AttendanceFormFields
                  form={form}
                  attendanceType={attendanceType}
                  isHalfDay={isHalfDay}
                  isDisabled={isAttendanceEditLocked}
                  resetAttendanceForm={resetAttendanceForm}
                  resetHalfDayForm={resetHalfDayForm}
                />
              </CardContent>
            </Card>

            {!isAttendanceEditLocked && (
              <DialogFooter className="px-4 sm:px-6">
                <DialogActionFooter
                  resetToDefault={resetToDefault}
                  onDelete={attendanceData ? onDelete : undefined}
                  isPending={isPending}
                  isDeletePending={isDeletePending}
                />
              </DialogFooter>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceDialog;
