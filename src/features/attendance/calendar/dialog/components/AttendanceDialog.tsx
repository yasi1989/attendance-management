import { isSaturday, isSunday } from 'date-fns';
import { useMemo } from 'react';
import DialogActionFooter from '@/components/dialog/DialogActionFooter';
import DialogHeaderWithClose from '@/components/dialog/DialogHeaderWithClose';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useDialogState } from '@/hooks/useDialogState';
import { Attendance, Holiday } from '@/lib/actionTypes';
import { useAttendance } from '../hooks/useAttendance';
import AttendanceFormFields from './AttendanceFormField';
import AttendanceStatusInformation from './AttendanceStatusInformation';

type AttendanceDialogProps = {
  day: Date;
  attendanceData?: Attendance;
  holidayInfo?: Holiday;
  isDisabled?: boolean;
  triggerContent?: React.ReactElement;
};

const AttendanceDialog = ({ day, attendanceData, holidayInfo, triggerContent, isDisabled }: AttendanceDialogProps) => {
  const isWeekend = useMemo(() => isSaturday(day) || isSunday(day), [day]);

  const {
    form,
    onSubmit,
    onDelete,
    resetAttendanceForm,
    resetHalfDayForm,
    attendanceType,
    isHalfDay,
    resetToDefault,
    isPending,
  } = useAttendance(day, attendanceData, isDisabled);
  const { open, handleOpenChange, handleCloseButtonClick } = useDialogState({
    form,
  });

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <div>{triggerContent}</div>
        </DialogTrigger>

        <DialogContent className="[&>button]:hidden w-full sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <DialogHeaderWithClose title="勤怠申請" onClose={handleCloseButtonClick} />

            <Card>
              <CardHeader>
                <AttendanceStatusInformation holidayInfo={holidayInfo} isWeekend={isWeekend} isDisabled={isDisabled} />
              </CardHeader>

              <CardContent>
                <AttendanceFormFields
                  form={form}
                  attendanceType={attendanceType}
                  isHalfDay={isHalfDay}
                  isDisabled={isDisabled}
                  resetAttendanceForm={resetAttendanceForm}
                  resetHalfDayForm={resetHalfDayForm}
                />
              </CardContent>
            </Card>

            {!isDisabled && (
              <DialogFooter className="px-4 sm:px-6">
                <DialogActionFooter
                  resetToDefault={resetToDefault}
                  onDelete={attendanceData ? onDelete : undefined}
                  isPending={isPending}
                />
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default AttendanceDialog;
