import { RotateCcw, Save, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

type DialogActionFooterProps = {
  resetToDefault: () => void;
  onDelete?: () => void;
  isPending: boolean;
  isDeletePending?: boolean;
};

const DialogActionFooter = ({
  resetToDefault,
  onDelete,
  isPending,
  isDeletePending = false,
}: DialogActionFooterProps) => {
  const isAnyPending = isPending || isDeletePending;

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-3">
      <Button
        variant="ghost"
        type="button"
        onClick={resetToDefault}
        disabled={isAnyPending}
        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 w-full sm:w-auto"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        リセット
      </Button>

      <div className="flex gap-2 items-center justify-end">
        {onDelete && (
          <Button
            type="button"
            onClick={onDelete}
            disabled={isAnyPending}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30 w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            削除
          </Button>
        )}

        <Button
          type="submit"
          disabled={isAnyPending}
          className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 text-white shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto"
        >
          <Save className="w-4 h-4 mr-2" />
          {isPending ? '保存中...' : '保存する'}
        </Button>
      </div>
    </div>
  );
};

export default DialogActionFooter;
