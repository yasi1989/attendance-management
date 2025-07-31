import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { UseFormReturn, RegisterOptions, Path } from 'react-hook-form';

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
          </FormControl>
          {description && <FormDescription className="text-xs">{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputFormField;
