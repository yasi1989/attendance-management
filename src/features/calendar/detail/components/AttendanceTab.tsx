'use client';
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parseISOStringToDate } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import InputFormField from "@/components/InputFormField";

const AttendanceFormSchema = z.object({
    date: z.date(),
    check_in: z.date(),
    check_out: z.date(),
    attendanceType: z.enum(['WORK', 'PAID_LEAVE', 'ABSENCE', 'SPECIAL']),
  });

type AttendanceTabProps = {
    dateString: string;
}
  
const AttendanceTab = ({ dateString }: AttendanceTabProps) => {
    const form = useForm<z.infer<typeof AttendanceFormSchema>>({
      resolver: zodResolver(AttendanceFormSchema),
      defaultValues: {
        date: parseISOStringToDate(dateString),
        check_in: '',
        check_out: '',
        attendanceType: 'WORK',
      },
    });

    const onSubmit = () => {
    }

    return (
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <InputCalender
            </div>
          </form>
        </Form>
      </FormProvider>
    )
}

export default AttendanceTab;