import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { UseFormReturn, RegisterOptions, Path } from 'react-hook-form';
import { formatDateToISOString, parseISOStringToDate } from '@/lib/dateFormatter';

type InputDateFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
  disabled?: boolean;
};
const InputDateFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  placeholder = '',
  required = false,
  className = '',
  rules,
  description,
  disabled = false,
}: InputDateFormFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type="date"
                placeholder={placeholder}
                className={className}
                disabled={disabled}
                value={formatDateToISOString(field.value as Date)}
                onChange={(e) => {
                  const date = parseISOStringToDate(e.target.value);
                  field.onChange(date);
                }}
                onBlur={field.onBlur}
              />
            </div>
          </FormControl>
          {description && <FormDescription className="text-xs">{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputDateFormField;
