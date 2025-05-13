'use client';
import { FormProvider } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import InputFormField from '@/components/InputFormField';
import CalendarDetailFooter from './CalendarDetailFooter';
import InputTextFormField from '@/components/InputTextFormField';
import { useLeave } from '@/features/calendar/detail/hooks/useAttendance';
import InputSelectFormField from '@/components/InputSelectFormField';
import { HALF_DAY_TYPES, LEAVE_TYPES } from '@/features/calendar/detail/const/attendanceConst';
import InputRadioFormField from '@/components/InputRadioFormField';
import InputCheckboxFormField from '@/components/InputCheckboxFormField';

type LeaveTabProps = {
  dateString: string;
};

const LeaveTab = ({ dateString }: LeaveTabProps) => {
  const { form, onSubmit, isHalfDay } = useLeave(dateString);

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <InputFormField form={form} name="date" label="申請日" disabled />
            <InputSelectFormField form={form} name="attendanceType" label="休暇形態" data={LEAVE_TYPES} />
            <InputCheckboxFormField form={form} name="isHalfDay" label="半休申請" />
            {isHalfDay && <InputRadioFormField form={form} name="halfDayType" label="半休種別" data={HALF_DAY_TYPES} />}
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

export default LeaveTab;
