import { RotateCcw, Send, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

type DialogActionFooterProps = {
  resetToDefault: () => void;
  onDelete?: () => void;
  isPending?: boolean;
};

const DialogActionFooter = ({ resetToDefault, onDelete, isPending }: DialogActionFooterProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full space-y-3 sm:space-y-0">
      <Button
        variant="outline"
        type="button"
        onClick={resetToDefault}
        className="border-gray-300 dark:border-gray-600 w-full sm:w-auto"
        disabled={isPending}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        リセット
      </Button>

      <div className="flex gap-2 items-center justify-center">
        {onDelete && (
          <Button
            type="button"
            onClick={onDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 w-full dark:text-white sm:w-auto"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            削除する
          </Button>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-full dark:text-white sm:w-auto"
        >
          <Send className="w-4 h-4 mr-2" />
          登録する
        </Button>
      </div>
    </div>
  );
};

export default DialogActionFooter;
