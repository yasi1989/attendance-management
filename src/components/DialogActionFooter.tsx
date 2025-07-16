import { RotateCcw, Send } from 'lucide-react';
import { Button } from './ui/button';

type DialogActionFooterProps = {
  resetToDefault: () => void;
  disabled?: boolean;
};

const DialogActionFooter = ({ resetToDefault, disabled }: DialogActionFooterProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full space-y-3 sm:space-y-0">
      <Button
        variant="outline"
        onClick={resetToDefault}
        className="border-gray-300 dark:border-gray-600 w-full sm:w-auto"
        disabled={disabled}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        リセット
      </Button>

      <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-full dark:text-white sm:w-auto">
        <Send className="w-4 h-4 mr-2" />
        登録する
      </Button>
    </div>
  );
};

export default DialogActionFooter;
