'use client';
import { FormProvider } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import InputFormField from '@/components/InputFormField';
import CalendarDetailFooter from './CalendarDetailFooter';
import InputTextFormField from '@/components/InputTextFormField';
import { useAttendance } from '@/features/calendar/detail/hooks/useAttendance';

type LeaveTabProps = {
  dateString: string;
};

const LeaveTab = ({ dateString }: LeaveTabProps) => {
  const { form, onSubmit } = useAttendance(dateString);

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <InputFormField form={form} name="date" label="勤務日" disabled />
            <InputFormField form={form} name="check_in" label="出勤時間" type="time" required />
            <InputFormField form={form} name="check_out" label="退勤時間" type="time" required />
            <InputFormField form={form} name="rest" label="休憩時間" type="time" required />
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