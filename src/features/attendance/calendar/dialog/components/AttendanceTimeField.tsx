import { Clock } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import InputTimeFormField from '@/components/form/InputTimeFormField';
import { Separator } from '@/components/ui/separator';
import { AttendanceFormSchema } from '../lib/formSchema';

type AttendanceTimeFieldProps = {
  form: UseFormReturn<z.infer<typeof AttendanceFormSchema>>;
  isDisabled?: boolean;
};

const TIME_FIELDS = [
  { name: 'startTime' as const, label: '出勤時間' },
  { name: 'endTime' as const, label: '退勤時間' },
  { name: 'breakTime' as const, label: '休憩時間' },
] as const;

const AttendanceTimeField = ({ form, isDisabled }: AttendanceTimeFieldProps) => {
  return (
    <div className="space-y-4">
      <Separator className="opacity-40" />
      <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
        <Clock className="h-4 w-4 text-blue-500" />
        勤務時間
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TIME_FIELDS.map((field) => (
          <InputTimeFormField
            key={field.name}
            form={form}
            name={field.name}
            label={field.label}
            required
            disabled={isDisabled}
          />
        ))}
      </div>
    </div>
  );
};

export default AttendanceTimeField;
