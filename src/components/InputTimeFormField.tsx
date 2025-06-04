import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { UseFormReturn, RegisterOptions, Path } from 'react-hook-form';
import { timestampToTimeString, timeStringToTimestamp } from '@/lib/dateFormatter';

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
  baseDate = new Date()
}: InputTimeFormFieldProps<T>) => {
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
                type="time"
                placeholder={placeholder}
                className={className}
                disabled={disabled}
                value={timestampToTimeString(field.value as number)}
                onChange={(e) => {
                  const timestamp = timeStringToTimestamp(e.target.value, baseDate);
                  field.onChange(timestamp);
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

export default InputTimeFormField;
