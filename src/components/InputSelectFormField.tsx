import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { UseFormReturn, RegisterOptions, Path } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type InputSelectFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
  options: Record<string, string>[];
  disabled?: boolean;
  onValueChange?: (value: string) => void;
};
const InputSelectFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  placeholder = '',
  required = false,
  rules,
  description,
  options,
  disabled,
  onValueChange,
}: InputSelectFormFieldProps<T>) => {
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
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onValueChange) {
                onValueChange(value);
              }
            }}
            value={field.value as string}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription className="text-xs">{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputSelectFormField;
