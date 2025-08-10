import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AttendanceData } from '../../types/attendance';
import { HolidayType } from '@/features/admin/holidays/type/holidayType';
import { isSaturday, isSunday } from 'date-fns';
import { useAttendance } from '../hooks/useAttendance';
import { FormProvider } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import DialogActionFooter from '@/components/dialog/DialogActionFooter';
import AttendanceDialogHeader from './AttendanceDialogHeader';
import AttendanceFormFields from './AttendanceFormField';
import AttendanceStatusInformation from './AttendanceStatusInformation';

type AttendanceDialogProps = {
  day: Date;
  attendanceData?: AttendanceData;
  holidayInfo?: HolidayType;
  isDisabled?: boolean;
  triggerContent?: React.ReactNode;
  preventOutsideClick?: boolean;
};

const AttendanceDialog = ({
  day,
  attendanceData,
  holidayInfo,
  triggerContent,
  isDisabled,
  preventOutsideClick = true,
}: AttendanceDialogProps) => {
  const [open, setOpen] = useState(false);
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
  } = useAttendance(day, attendanceData, isDisabled);

  const handleOpenChange = (newOpen: boolean) => {
    if (preventOutsideClick && !newOpen) {
      return;
    }
    setOpen(newOpen);
  };
  const handleClose = () => setOpen(false);

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <div
              onKeyUp={() => setOpen(true)}
              onKeyDown={() => setOpen(true)}
              onClick={() => setOpen(true)}
            >
              {triggerContent}
            </div>
          </DialogTrigger>

          <DialogContent className="[&>button]:hidden max-w-4xl sm:w-full px-0 py-2">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AttendanceDialogHeader day={day} holidayInfo={holidayInfo} onClose={handleClose} isWeekend={false} />

              <ScrollArea className="flex-1 px-4 sm:px-6">
                <Card>
                  <CardHeader>
                    <AttendanceStatusInformation
                      holidayInfo={holidayInfo}
                      isWeekend={isWeekend}
                      isDisabled={isDisabled}
                    />
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
              </ScrollArea>

              {!isDisabled && (
                <DialogFooter className="px-4 sm:px-6 py-4">
                  <DialogActionFooter resetToDefault={resetToDefault} disabled={isPending} />
                </DialogFooter>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </Form>
    </FormProvider>
  );
};

export default AttendanceDialog;
