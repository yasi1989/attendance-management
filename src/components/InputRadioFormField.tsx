import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { UseFormReturn, RegisterOptions, Path } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type SelectOption = {
  value: string;
  label: string;
};

type InputRadioFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
  options: SelectOption[];
};
const InputRadioFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  required = false,
  rules,
  description,
  options,
}: InputRadioFormFieldProps<T>) => {
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
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value as string} className="flex space-x-2">
              {options.map((item) => (
                <FormItem key={item.value} className="flex items-center space-x-1">
                  <RadioGroupItem value={item.value} />
                  <FormLabel>{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription className="text-xs">{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputRadioFormField;
