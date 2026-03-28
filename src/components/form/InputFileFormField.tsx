import Link from 'next/link';
import { Controller, type Path, type RegisterOptions, type UseFormReturn } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type InputFileFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
  disabled?: boolean;
  existingFile?: string;
};

const InputFileFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  required = false,
  className = '',
  rules,
  description,
  disabled,
  existingFile,
}: InputFileFormFieldProps<T>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({ field: { value: _value, onChange, ...fieldProps }, fieldState }) => (
        <Field>
          <FieldLabel className="flex gap-4 justify-start items-center">
            <div>
              {label} {required && <span className="text-destructive">*</span>}
            </div>
            {existingFile && (
              <div className="text-sm">
                現在のファイル：{' '}
                <Link
                  href={existingFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline hover:text-blue-600"
                >
                  表示
                </Link>
              </div>
            )}
          </FieldLabel>
          <Input
            accept="image/*"
            type="file"
            onChange={(event) => onChange(event.target.files)}
            {...fieldProps}
            className={cn(className, 'cursor-pointer')}
            disabled={disabled}
          />
          {description && <FieldDescription className="text-xs">{description}</FieldDescription>}
          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
};

export default InputFileFormField;
