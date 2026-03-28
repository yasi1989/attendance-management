import { Controller, type Path, type RegisterOptions, type UseFormReturn } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type InputRadioFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
  disabled?: boolean;
  options: Record<string, string>[];
};

const InputRadioFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  required = false,
  rules,
  description,
  disabled,
  options,
}: InputRadioFormFieldProps<T>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field>
          {label && (
            <FieldLabel>
              {label} {required && <span className="text-destructive">*</span>}
            </FieldLabel>
          )}
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value as string}
            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
            disabled={disabled}
          >
            {options.map((item) => (
              <Field key={item.value} className="flex items-center space-x-1">
                <RadioGroupItem value={item.value} />
                <FieldLabel className="text-sm">{item.label}</FieldLabel>
              </Field>
            ))}
          </RadioGroup>
          {description && <FieldDescription className="text-xs">{description}</FieldDescription>}
          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
};

export default InputRadioFormField;
