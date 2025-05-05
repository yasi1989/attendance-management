import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import { ja } from "date-fns/locale";
import { format } from "date-fns";
import { Control } from "react-hook-form";
import { z } from "zod";
import { ExpenseFormSchema } from "@/lib/formSchema";

interface GeneralExpenseTabProps {
  control: Control<z.infer<typeof ExpenseFormSchema>>;
}

export function GeneralExpenseTab({ control }: GeneralExpenseTabProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="requestDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-foreground">申請日 <span className="text-destructive">*</span></FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className="w-full pl-3 text-left font-normal"
                  >
                    {field.value ? (
                      format(field.value, "yyyy年MM月dd日", { locale: ja })
                    ) : (
                      <span className="text-muted-foreground">日付を選択</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  locale={ja}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">金額 (円) <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  {...field} 
                  type="number" 
                  min={0}
                  className="pl-8" 
                  placeholder="10000" 
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">¥</span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">説明 <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="経費の詳細な説明を入力してください"
                className="resize-none"
                rows={4}
              />
            </FormControl>
            <FormDescription className="text-xs">
              経費の目的、理由、またはその他の関連情報を入力してください。
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="receiptUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">領収書</FormLabel>
            <FormControl>
            <Input id="picture" type="file" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}