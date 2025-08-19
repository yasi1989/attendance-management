export const FORM_MODE = {
  ADD: 'add',
  EDIT: 'edit',
} as const;

export type FormMode = (typeof FORM_MODE)[keyof typeof FORM_MODE];
