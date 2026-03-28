import { Controller, type Path, type RegisterOptions, type UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '../ui/checkbox';

type InputCheckboxFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  onValueChange?: () => void;
  rules?: RegisterOptions<T, Path<T>>;
  disabled?: boolean;
};

const InputCheckboxFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  onValueChange,
  rules,
  disabled,
}: InputCheckboxFormFieldProps<T>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field className="flex items-center space-x-2">
          <Checkbox
            onCheckedChange={(value) => {
              field.onChange(value);
              onValueChange?.();
            }}
            checked={field.value as boolean}
            disabled={disabled}
          />
          <FieldLabel>{label}</FieldLabel>
          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
};

export default InputCheckboxFormField;
