import { UseFormReturn } from 'react-hook-form';
import InputSelectFormField from '@/components/form/InputSelectFormField';
import InputTextFormField from '@/components/form/InputTextFormField';
import { ATTENDANCES } from '../../../../../consts/attendance';
import { AttendanceFormSchema } from '../lib/formSchema';
import { z } from 'zod';
import InputDateFormField from '@/components/form/InputDateFormField';
import { useMemo } from 'react';
import { AttendanceType } from '../../types/attendance';
import AttendanceTimeField from './AttendanceTimeField';
import AttendanceHalfDayField from './AttendanceHalfDayField';

interface AttendanceFormFieldsProps {
  form: UseFormReturn<z.infer<typeof AttendanceFormSchema>>;
  attendanceType: AttendanceType;
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
  const attendanceOptions = useMemo(() => {
    return Object.values(ATTENDANCES).map((attendance) => ({
      value: attendance.value,
      label: attendance.label,
    }));
  }, []);
  const shouldShowHalfDayField = attendanceType === ATTENDANCES.PAID.value;
  const shouldShowTimeField =
    attendanceType === ATTENDANCES.WORK.value || (attendanceType === ATTENDANCES.PAID.value && isHalfDay);
  return (
    <div className="space-y-4">
      <InputDateFormField form={form} name="date" label="日付" placeholder="日付" disabled={true} />
      <InputSelectFormField
        form={form}
        name="attendanceType"
        label="勤怠種別"
        options={attendanceOptions}
        onValueChange={resetAttendanceForm}
        required
        disabled={isDisabled}
      />

      {shouldShowHalfDayField && (
        <AttendanceHalfDayField
          form={form}
          isHalfDay={isHalfDay}
          isDisabled={isDisabled}
          resetHalfDayForm={resetHalfDayForm}
        />
      )}

      {shouldShowTimeField && <AttendanceTimeField form={form} isDisabled={isDisabled} />}

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
