import { UseFormReturn } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import InputSelectFormField from '@/components/form/InputSelectFormField';
import InputRadioFormField from '@/components/form/InputRadioFormField';
import InputCheckboxFormField from '@/components/form/InputCheckboxFormField';
import InputTimeFormField from '@/components/form/InputTimeFormField';
import InputTextFormField from '@/components/form/InputTextFormField';
import { ATTENDANCES, HALF_DAYS } from '../../../../../consts/attendance';
import { AttendanceFormSchema } from '../lib/formSchema';
import { z } from 'zod';
import InputDateFormField from '@/components/form/InputDateFormField';

interface AttendanceFormFieldsProps {
  form: UseFormReturn<z.infer<typeof AttendanceFormSchema>>;
  attendanceType: string;
  isHalfDay?: boolean;
  isDisabled?: boolean;
  resetAttendanceForm: () => void;
  resetHalfDayForm: () => void;
}

const AttendanceFormFields = ({
  form,
  attendanceType,
  isHalfDay,
  isDisabled,
  resetAttendanceForm,
  resetHalfDayForm,
}: AttendanceFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <InputDateFormField form={form} name="date" label="日付" placeholder="日付" disabled={true} />

      <InputSelectFormField
        form={form}
        name="attendanceType"
        label="勤怠種別"
        options={Object.values(ATTENDANCES).map((attendance) => ({
          value: attendance.value,
          label: attendance.label,
        }))}
        onValueChange={resetAttendanceForm}
        required
        disabled={isDisabled}
      />

      {attendanceType === 'Paid' && (
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
              <InputRadioFormField
                form={form}
                name="halfDayType"
                options={Object.values(HALF_DAYS).map((halfDay) => ({
                  value: halfDay.value,
                  label: halfDay.label,
                }))}
                disabled={isDisabled}
              />
            </div>
          )}
        </div>
      )}

      {(attendanceType === 'Work' || isHalfDay) && (
        <div className="space-y-4">
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <InputTimeFormField
                form={form}
                name="check_in"
                label="出勤時間"
                placeholder="出勤時間"
                required
                disabled={isDisabled}
              />
            </div>
            <div className="space-y-2">
              <InputTimeFormField
                form={form}
                name="check_out"
                label="退勤時間"
                placeholder="退勤時間"
                required
                disabled={isDisabled}
              />
            </div>
            <div className="space-y-2">
              <InputTimeFormField
                form={form}
                name="rest"
                label="休憩時間"
                placeholder="休憩時間"
                required
                disabled={isDisabled}
              />
            </div>
          </div>
        </div>
      )}

      <InputTextFormField
        form={form}
        name="comment"
        label="備考"
        placeholder="申請に関する補足事項があれば入力してください（任意）"
        className="resize-none"
        maxLength={500}
        disabled={isDisabled}
      />
    </div>
  );
};

export default AttendanceFormFields;
