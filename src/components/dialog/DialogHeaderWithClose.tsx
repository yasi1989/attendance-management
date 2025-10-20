import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface DialogHeaderWithCloseProps {
  title: string;
  onClose?: () => void;
  isCloseButtonVisible?: boolean;
}

const DialogHeaderWithClose = ({ title, onClose, isCloseButtonVisible = true }: DialogHeaderWithCloseProps) => {
  return (
    <DialogHeader>
      <div className="flex items-center justify-between">
        <DialogTitle className="text-lg sm:text-xl">{title}</DialogTitle>
        {isCloseButtonVisible && (
          <Button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
            aria-label="ダイアログを閉じる"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </Button>
        )}
      </div>
    </DialogHeader>
  );
};

export default DialogHeaderWithClose;
