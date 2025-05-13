import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AttendanceFormSchema } from '@/features/calendar/detail/lib/formSchema';
import { z } from 'zod';
import { useTransition } from 'react';

export const useAttendance = (dateString: string) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AttendanceFormSchema>>({
    resolver: zodResolver(AttendanceFormSchema),
    defaultValues: {
      date: dateString,
      check_in: '08:45',
      check_out: '17:30',
      rest: '00:45',
      attendanceType: 'WORK',
      comment: '',
    },
    mode: 'onChange',
  });
  const onSubmit = (data: z.infer<typeof AttendanceFormSchema>) => {
    startTransition(async () => {
      console.log(data);
    });
  };

  return { form, onSubmit, isPending };
};

export const useLeave = (dateString: string) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof AttendanceFormSchema>>({
      resolver: zodResolver(AttendanceFormSchema),
      defaultValues: {
        date: dateString,
        check_in: '08:45',
        check_out: '17:30',
        rest: '00:45',
        attendanceType: 'WORK',
        comment: '',
      },
      mode: 'onChange',
    });
    const onSubmit = (data: z.infer<typeof AttendanceFormSchema>) => {
      startTransition(async () => {
        console.log(data);
      });
    };
  
    return { form, onSubmit, isPending };
  };
  