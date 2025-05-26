import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { UseFormReturn, RegisterOptions, Path } from 'react-hook-form';
import { Checkbox } from './ui/checkbox';

type InputCheckboxFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  rules?: RegisterOptions<T, Path<T>>;
};
const InputCheckboxFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  rules,
}: InputCheckboxFormFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-2">
          <FormControl>
            <Checkbox onCheckedChange={field.onChange} checked={field.value as boolean} />
          </FormControl>
          <FormLabel>{label}</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputCheckboxFormField;
