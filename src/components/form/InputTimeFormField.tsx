import { Controller, type Path, type RegisterOptions, type UseFormReturn } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { formatMinutesToTimeString, parseTimeStringToMinutes } from '@/lib/dateClient';

type InputTimeFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
  disabled?: boolean;
  baseDate?: Date;
};

const InputTimeFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  placeholder = '',
  required = false,
  className = '',
  rules,
  description,
  disabled = false,
}: InputTimeFormFieldProps<T>) => {
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
              type="time"
              placeholder={placeholder}
              className={className}
              disabled={disabled}
              value={formatMinutesToTimeString(field.value as number)}
              onChange={(e) => {
                const timestamp = parseTimeStringToMinutes(e.target.value);
                field.onChange(timestamp);
              }}
              onBlur={field.onBlur}
            />
          </div>
          {description && <FieldDescription className="text-xs">{description}</FieldDescription>}
          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
};

export default InputTimeFormField;
