import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Path, RegisterOptions, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type InputCalendarFormFieldProps<T extends Record<string, unknown>> = {
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
const InputCalendarFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  placeholder = '日付を選択',
  required = false,
  className = '',
  rules,
  description,
  disabled,
}: InputCalendarFormFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-foreground">
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="outline" className="w-full pl-3 text-left font-normal" disabled={disabled}>
                  {field.value ? (
                    format(field.value as unknown as Date, 'yyyy年MM月dd日', { locale: ja })
                  ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value as Date}
                onSelect={field.onChange}
                locale={ja}
                initialFocus
                className={className}
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription className="text-xs">{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputCalendarFormField;
