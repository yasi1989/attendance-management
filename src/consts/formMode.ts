export const FORM_MODE = {
  ADD: { value: 'add', label: '登録' },
  EDIT: { value: 'edit', label: '更新' },
} as const;

export type FormMode = (typeof FORM_MODE)[keyof typeof FORM_MODE]['value'];
