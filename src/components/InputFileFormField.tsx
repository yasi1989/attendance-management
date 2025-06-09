import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import type { UseFormReturn, RegisterOptions, Path } from 'react-hook-form';

type InputFileFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
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
  existingFile,
}: InputFileFormFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel className="flex gap-4 justify-start items-center">
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
          </FormLabel>
          <FormControl>
            <Input
              accept="image/*"
              type="file"
              onChange={(event) => onChange(event.target.files)}
              {...fieldProps}
              className={className}
            />
          </FormControl>
          {description && <FormDescription className="text-xs">{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputFileFormField;
