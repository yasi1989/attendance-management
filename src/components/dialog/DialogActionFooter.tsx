import { RotateCcw, Save, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

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

  const ResetButton: React.ReactNode = (
    <Button
      variant="ghost"
      type="button"
      size="sm"
      onClick={resetToDefault}
      disabled={isAnyPending}
      className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-all duration-200"
    >
      <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
      リセット
    </Button>
  );

  return (
    <div className="flex flex-col gap-3 w-full pt-2">
      <Separator className="bg-slate-100 dark:bg-slate-800" />

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {onDelete ? (
            <Button
              type="button"
              onClick={onDelete}
              disabled={isAnyPending}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-all duration-200"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              {isDeletePending ? '削除中...' : '削除'}
            </Button>
          ) : (
            ResetButton
          )}
        </div>

        <div className="flex items-center gap-2">
          {onDelete && ResetButton}

          <Button
            type="submit"
            size="sm"
            disabled={isAnyPending}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 shadow-sm transition-all duration-200 min-w-24"
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            {isPending ? '保存中...' : '保存'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DialogActionFooter;
