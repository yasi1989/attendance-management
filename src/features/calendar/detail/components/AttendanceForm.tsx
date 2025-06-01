'use client';
import { FormProvider } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import InputFormField from '@/components/InputFormField';
import CalendarDetailFooter from './CalendarDetailFooter';
import InputTextFormField from '@/components/InputTextFormField';
import { useAttendance } from '@/features/calendar/detail/hooks/useAttendance';
import InputSelectFormField from '@/components/InputSelectFormField';
import InputCheckboxFormField from '@/components/InputCheckboxFormField';
import InputRadioFormField from '@/components/InputRadioFormField';
import { HALF_DAY_TYPES, ATTENDANCE_TYPES } from '@/features/calendar/detail/const/attendanceConst';
import CalendarTimeField from './CalendarTimeField';

type AttendanceTabProps = {
  dateString: string;
};

const AttendanceTab = ({ dateString }: AttendanceTabProps) => {
  const { form, onSubmit, resetAttendanceForm, resetHalfDayForm, attendanceType, isHalfDay } = useAttendance(dateString);

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <InputFormField form={form} name="date" label="勤務日" disabled />
            <InputSelectFormField form={form} name="attendanceType" label="勤怠種別" options={ATTENDANCE_TYPES} onValueChange={resetAttendanceForm} />
            {attendanceType === 'PAID_LEAVE' && <InputCheckboxFormField form={form} name="isHalfDay" label="半休申請" onValueChange={resetHalfDayForm} />}
            {isHalfDay && (
              <InputRadioFormField form={form} name="halfDayType" label="半休種別" options={HALF_DAY_TYPES} />
            )}
            {(attendanceType === 'WORK' || isHalfDay) && <CalendarTimeField form={form} />}
            <InputTextFormField
              form={form}
              name="comment"
              label="備考"
              row={4}
              maxLength={100}
              className="resize-none"
            />
          </div>
          <CalendarDetailFooter form={form} />
        </form>
      </Form>
    </FormProvider>
  );
};

export default AttendanceTab;
