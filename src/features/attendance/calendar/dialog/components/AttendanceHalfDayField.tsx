import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { AttendanceFormSchema } from '../lib/formSchema';
import InputCheckboxFormField from '@/components/form/InputCheckboxFormField';
import InputRadioFormField from '@/components/form/InputRadioFormField';
import { useMemo } from 'react';
import { HALF_DAYS } from '../../../../../consts/attendance';
type AttendanceHalfDayFieldProps = {
  form: UseFormReturn<z.infer<typeof AttendanceFormSchema>>;
  isHalfDay?: boolean;
  isDisabled?: boolean;
  resetHalfDayForm: () => void;
};
const AttendanceHalfDayField = ({ form, isHalfDay, isDisabled, resetHalfDayForm }: AttendanceHalfDayFieldProps) => {
  const halfDayOptions = useMemo(() => {
    return Object.values(HALF_DAYS).map((halfDay) => ({
      value: halfDay.value,
      label: halfDay.label,
    }));
  }, []);
  return (
    <div className="space-y-4">
      <InputCheckboxFormField
        form={form}
        name="isHalfDay"
        label="半休申請"
        onValueChange={resetHalfDayForm}
        disabled={isDisabled}
      />
      {isHalfDay && (
        <div className="ml-6">
          <InputRadioFormField form={form} name="halfDayType" options={halfDayOptions} disabled={isDisabled} />
        </div>
      )}
    </div>
  );
};

export default AttendanceHalfDayField;
