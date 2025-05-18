import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { AttendanceFormSchema } from '@/features/calendar/detail/lib/formSchema';
import InputFormField from '@/components/InputFormField';

const CalendarTimeField = ({form}: {form: UseFormReturn<z.infer<typeof AttendanceFormSchema>>}) => {
  return (
    <>
      <InputFormField form={form} name="check_in" label="出勤時間" type="time" required />
      <InputFormField form={form} name="check_out" label="退勤時間" type="time" required />
      <InputFormField form={form} name="rest" label="休憩時間" type="time" required />
    </>
  )
}

export default CalendarTimeField