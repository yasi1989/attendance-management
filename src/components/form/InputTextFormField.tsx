import { Controller, type Path, type RegisterOptions, type UseFormReturn } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

type InputTextFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  maxLength?: number;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
  row?: number;
  disabled?: boolean;
};

const InputTextFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  placeholder = '',
  required = false,
  className = '',
  rules,
  maxLength,
  description,
  row,
  disabled,
}: InputTextFormFieldProps<T>) => {
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
          <Textarea
            placeholder={placeholder}
            value={field.value as string | undefined}
            onChange={field.onChange}
            onBlur={field.onBlur}
            className={className}
            maxLength={maxLength}
            rows={row}
            disabled={disabled}
          />
          {maxLength && (
            <Label className="text-xs flex justify-end items-center">
              {String(field.value || 0).length}/{maxLength}文字
            </Label>
          )}
          {description && <FieldDescription className="text-xs">{description}</FieldDescription>}
          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
};

export default InputTextFormField;
