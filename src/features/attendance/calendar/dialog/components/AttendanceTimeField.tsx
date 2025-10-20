import InputTimeFormField from '@/components/form/InputTimeFormField';
import { Separator } from '@/components/ui/separator';
import { UseFormReturn } from 'react-hook-form';
import { AttendanceFormSchema } from '../lib/formSchema';
import { z } from 'zod';
type AttendanceTimeFieldProps = {
  form: UseFormReturn<z.infer<typeof AttendanceFormSchema>>;
  isDisabled?: boolean;
};

const TIME_FIELDS = [
  { name: 'check_in' as const, label: '出勤時間' },
  { name: 'check_out' as const, label: '退勤時間' },
  { name: 'rest' as const, label: '休憩時間' },
] as const;

const AttendanceTimeField = ({ form, isDisabled }: AttendanceTimeFieldProps) => {
  return (
    <div className="space-y-4">
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
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
    </div>
  );
};

export default AttendanceTimeField;
