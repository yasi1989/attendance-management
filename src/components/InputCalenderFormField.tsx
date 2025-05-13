import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CalendarIcon } from 'lucide-react';
import { ja } from 'date-fns/locale';
import { format } from 'date-fns';
import { UseFormReturn, RegisterOptions, Path } from 'react-hook-form';

type InputCalenderFormFieldProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
};
const InputCalenderFormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  placeholder = '',
  required = false,
  className = '',
  rules,
  description,
}: InputCalenderFormFieldProps<T>) => {
  return (
    <>
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
                  <Button variant="outline" className="w-full pl-3 text-left font-normal">
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
    </>
  );
};

export default InputCalenderFormField;
