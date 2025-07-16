import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { z } from 'zod';
import InputFormField from '@/components/InputFormField';
import { ExpenseFormSchema } from '../../lib/formSchema';

interface RouteFormItemProps {
  index: number;
  onRemove: () => void;
  isRemovable: boolean;
  disabled?: boolean;
}

export function RouteFormItem({ index, onRemove, isRemovable, disabled }: RouteFormItemProps) {
  const form = useFormContext<z.infer<typeof ExpenseFormSchema>>();

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
            disabled={disabled}
          >
            <Trash2Icon className="h-4 w-4" />
            <span className="sr-only">経路を削除</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputFormField
          form={form}
          name={`routes.${index}.from`}
          label="出発地"
          placeholder="東京"
          required
          disabled={disabled}
        />
        <InputFormField
          form={form}
          name={`routes.${index}.to`}
          label="目的地"
          placeholder="大阪"
          required
          disabled={disabled}
        />
      </div>

      <InputFormField
        form={form}
        name={`routes.${index}.fare`}
        label="運賃"
        placeholder="14000"
        type="number"
        required
        moneyField={true}
        className="pl-8"
        disabled={disabled}
      />
    </div>
  );
}
