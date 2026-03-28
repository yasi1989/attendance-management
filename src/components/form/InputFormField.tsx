import { Controller, type Path, type RegisterOptions, type UseFormReturn } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type InputFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  moneyField?: boolean;
  required?: boolean;
  className?: string;
  maxLength?: number;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
  disabled?: boolean;
};

const InputFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  placeholder = '',
  type = 'text',
  moneyField = false,
  required = false,
  className = '',
  rules,
  maxLength,
  description,
  disabled = false,
}: InputFormFieldProps<T>) => {
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
          <div className="relative">
            <Input
              placeholder={placeholder}
              type={type}
              className={className}
              disabled={disabled}
              maxLength={maxLength}
              value={
                type === 'number'
                  ? field.value?.toString() || ''
                  : (field.value as string | number | readonly string[] | undefined)
              }
              onChange={(e) => {
                if (type === 'number') {
                  const value = e.target.value;
                  const numValue = value === '' ? 0 : Number.parseFloat(value);
                  field.onChange(Number.isNaN(numValue) ? 0 : numValue);
                } else {
                  field.onChange(e.target.value);
                }
              }}
              onBlur={field.onBlur}
            />
            {moneyField && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">¥</span>}
          </div>
          {description && <FieldDescription className="text-xs">{description}</FieldDescription>}
          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
};

export default InputFormField;
