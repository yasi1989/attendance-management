import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { UseFormReturn, RegisterOptions, Path } from 'react-hook-form';
import { Checkbox } from './ui/checkbox';

type InputCheckboxFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  onValueChange?: () => void;
  rules?: RegisterOptions<T, Path<T>>;
  disabled?: boolean;
};
const InputCheckboxFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  onValueChange,
  rules,
  disabled,
}: InputCheckboxFormFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-2">
          <FormControl>
            <Checkbox
              onCheckedChange={(value) => {
                field.onChange(value);
                if (onValueChange) {
                  onValueChange();
                }
              }}
              checked={field.value as boolean}
              disabled={disabled}
            />
          </FormControl>
          <FormLabel>{label}</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputCheckboxFormField;
