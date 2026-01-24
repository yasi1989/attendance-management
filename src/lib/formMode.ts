import { FORM_MODE, FormMode } from '@/consts/formMode';

export const getFormModeByValue = (value: string) => {
  return Object.values(FORM_MODE).find((formMode) => formMode.value === value);
};

export const getFormModeName = (mode: FormMode) => {
  const formMode = getFormModeByValue(mode);
  return formMode ? formMode.label : '';
};
