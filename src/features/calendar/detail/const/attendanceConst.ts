import { SelectOption } from '@/components/InputRadioFormField';

export const ATTENDANCE_TYPES: SelectOption[] = [
  {
    value: 'WORK',
    label: '出勤',
  },
  {
    value: 'PAID_LEAVE',
    label: '有給休暇',
  },
  {
    value: 'ABSENCE',
    label: '欠勤',
  },
  {
    value: 'SPECIAL',
    label: '特別休暇',
  },
];

export const HALF_DAY_TYPES: SelectOption[] = [
  {
    value: 'AM',
    label: '午前',
  },
  {
    value: 'PM',
    label: '午後',
  },
];
