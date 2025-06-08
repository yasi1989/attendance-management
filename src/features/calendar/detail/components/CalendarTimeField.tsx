import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { AttendanceFormSchema } from '@/features/calendar/detail/lib/formSchema';
import InputTimeFormField from '@/components/InputTimeFormField';

const CalendarTimeField = ({ form }: { form: UseFormReturn<z.infer<typeof AttendanceFormSchema>> }) => {
  return (
    <>
      <InputTimeFormField form={form} name="check_in" label="出勤時間" required />
      <InputTimeFormField form={form} name="check_out" label="退勤時間" required />
      <InputTimeFormField form={form} name="rest" label="休憩時間" required />
    </>
  );
};

export default CalendarTimeField;
