import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { UseFormReturn, RegisterOptions, Path } from 'react-hook-form';
import { Textarea } from './ui/textarea';

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
}: InputTextFormFieldProps<T>) => {
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
            <Textarea
              placeholder={placeholder}
              value={field.value as string | undefined}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className={className}
              maxLength={maxLength}
              rows={row}
            />
          </FormControl>
          {description && <FormDescription className="text-xs">{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputTextFormField;
