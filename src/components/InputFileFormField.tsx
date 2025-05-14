import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { UseFormReturn, RegisterOptions, Path } from 'react-hook-form';

type InputFileFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
};
const InputFileFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  required = false,
  className = '',
  rules,
  description,
}: InputFileFormFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field: { value: _value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
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
