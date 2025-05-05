import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Trash2Icon } from "lucide-react";
import { z } from "zod";
import { ExpenseFormSchema } from "@/lib/formSchema";

interface RouteFormItemProps {
  index: number;
  onRemove: () => void;
  isRemovable: boolean;
}

export function RouteFormItem({ index, onRemove, isRemovable }: RouteFormItemProps) {
  const { control, watch, setValue } = useFormContext<z.infer<typeof ExpenseFormSchema>>();
  
  // Watch fare values to update total amount
  const fare = watch(`routes.${index}.fare`);
  
  // Update parent amount when fare changes
  useEffect(() => {
    if (fare) {
      const routes = watch("routes");
      const totalFare = routes.reduce((sum, route) => sum + (Number(route.fare) || 0), 0);
      setValue("amount", totalFare);
    }
  }, [fare, setValue, watch]);

  return (
    <div className="flex flex-col bg-muted/20 p-4 rounded-lg space-y-4 relative">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium">経路 {index + 1}</h4>
        {isRemovable && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={onRemove}
          >
            <Trash2Icon className="h-4 w-4" />
            <span className="sr-only">経路を削除</span>
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 出発地 (From) */}
        <FormField
          control={control}
          name={`routes.${index}.from`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">出発地 <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input {...field} placeholder="東京" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 目的地 (To) */}
        <FormField
          control={control}
          name={`routes.${index}.to`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">目的地 <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input {...field} placeholder="大阪" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* 運賃 (Fare) */}
      <FormField
        control={control}
        name={`routes.${index}.fare`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground text-sm">運賃 (円) <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  {...field} 
                  type="number" 
                  min={0}
                  className="pl-8" 
                  placeholder="14000" 
                />
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