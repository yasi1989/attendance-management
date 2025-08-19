import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import ConfirmDialog from '../dialog/ConfirmDialog';

type DeleteButtonProps = {
  title?: string;
  description?: string;
  onDelete: () => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  size?: 'sm' | 'md';
  showConfirmation?: boolean;
};

export const DeleteButton = ({
  title = '本当に削除しますか？',
  description = 'この動作は元に戻せません。',
  onDelete,
  isLoading = false,
  disabled = false,
  children,
  size = 'md',
  showConfirmation = true,
}: DeleteButtonProps) => {
  const sizeClasses = size === 'sm' ? 'h-6 w-6' : 'h-6 w-6 md:h-8 md:w-8';
  const iconSizeClasses = size === 'sm' ? 'h-3 w-3' : 'h-3 w-3 md:h-4 md:w-4';

  const buttonContent = (
    <Button
      variant="ghost"
      size="icon"
      disabled={disabled || isLoading}
      onClick={showConfirmation ? undefined : onDelete}
      className={`${sizeClasses} rounded-md bg-gradient-to-r from-red-50/90 to-rose-50/90 hover:from-red-100/90 hover:to-rose-100/90 dark:from-red-900/30 dark:to-rose-900/30 dark:hover:from-red-800/40 dark:hover:to-rose-800/40 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-200 border border-red-200/30 dark:border-red-700/30 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <Trash2 className={`${iconSizeClasses} text-red-600 dark:text-red-400`} />
    </Button>
  );

  const finalButton = children || buttonContent;

  if (!showConfirmation) {
    return finalButton;
  }

  return (
    <ConfirmDialog
      title={title}
      description={description}
      onAction={onDelete}
      isLoading={isLoading}
    >
      {finalButton}
    </ConfirmDialog>
  );
};
