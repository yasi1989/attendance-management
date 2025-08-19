import { Plus, Train } from 'lucide-react';
import { ExpenseFormSchema } from '../lib/formSchema';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { RouteFormItem } from './RouteFormItem';

type ExpenseTransportInfoFieldProps = {
  fields: z.infer<typeof ExpenseFormSchema>['routes'];
  handleAddRoute: () => void;
  handleRemoveRoute: (index: number) => void;
  isDisabled: boolean;
};

const ExpenseTransportInfoField = ({ fields, handleAddRoute, handleRemoveRoute, isDisabled }: ExpenseTransportInfoFieldProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
        <Train className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">経路情報</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <RouteFormItem
                key={field.id}
                index={index}
                onRemove={() => handleRemoveRoute(index)}
                isRemovable={fields.length > 1}
                disabled={isDisabled}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-start">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            onClick={handleAddRoute}
            disabled={isDisabled}
          >
            <Plus className="h-4 w-4" />
            <span>経路を追加</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTransportInfoField;
