import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RouteFormItem } from './RouteFormItem';
import { PlusIcon } from 'lucide-react';
import { ExpenseFormSchema } from '@/features/auth/lib/formSchema';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale/ja';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export function TransportationTab() {
  const { control, watch } = useFormContext<typeof ExpenseFormSchema>();

  const { fields, append, remove } = useFieldArray({
    name: 'routes',
    control,
  }); 

  useEffect(() => {
    if (fields.length === 0) {
      append({ from: '', to: '', fare: 0 });
    }
  }, [append, fields.length]);

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="routes.requestDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-foreground">
              申請日 <span className="text-destructive">*</span>
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button variant="outline" className="w-full pl-3 text-left font-normal">
                    {field.value ? (
                      format(field.value, 'yyyy年MM月dd日', { locale: ja })
                    ) : (
                      <span className="text-muted-foreground">日付を選択</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={field.value} onSelect={field.onChange} locale={ja} initialFocus />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">
              説明 <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="経費の詳細な説明を入力してください" className="resize-none" rows={4} />
            </FormControl>
            <FormDescription className="text-xs">
              経費の目的、理由、またはその他の関連情報を入力してください。
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-6 bg-stone-50 rounded-lg shadow">
        {fields.map((field, index) => (
          <RouteFormItem key={field.id} index={index} onRemove={() => remove(index)} isRemovable={fields.length > 1} />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => append({ from: '', to: '', fare: 0 })}
        >
          <PlusIcon className="h-4 w-4" />
          <span>経路を追加</span>
        </Button>
      </div>

      <FormField
        control={control}
        name="routes.amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">金額 (円)</FormLabel>
            <FormControl>
              <div className="relative">
                <Input {...field} type="number" min={0} className="pl-8 bg-stone-50" placeholder="10000" disabled />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">¥</span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
