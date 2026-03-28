import { Controller, type Path, type RegisterOptions, type UseFormReturn } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SELECT_EMPTY } from '@/consts/form';

type InputSelectFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
  options: Record<string, string>[];
  disabled?: boolean;
  onValueChange?: (value: string | null) => void;
};

const InputSelectFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  placeholder = '選択してください',
  required = false,
  rules,
  description,
  options,
  disabled,
  onValueChange,
}: InputSelectFormFieldProps<T>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <Select
            onValueChange={(value) => {
              const resolved = value === SELECT_EMPTY.value ? null : value;
              field.onChange(resolved);
              onValueChange?.(resolved);
            }}
            value={(field.value as string) ?? SELECT_EMPTY.value}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FieldDescription className="text-xs">{description}</FieldDescription>}
          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
};

export default InputSelectFormField;
