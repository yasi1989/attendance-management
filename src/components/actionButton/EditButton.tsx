import { Button } from '@/components/ui/button';
import { Edit, FileText } from 'lucide-react';

type EditButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  editable?: boolean;
  children?: React.ReactNode;
  size?: 'sm' | 'md';
  className?: string;
};

export const EditButton = ({
  onClick,
  disabled = false,
  editable = true,
  children,
  size = 'md',
  className = '',
}: EditButtonProps) => {
  const sizeClasses = size === 'sm' ? 'h-6 w-6' : 'h-6 w-6 md:h-8 md:w-8';
  const iconSizeClasses = size === 'sm' ? 'h-3 w-3' : 'h-3 w-3 md:h-4 md:w-4';

  const buttonContent = (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClasses} rounded-md bg-gradient-to-r from-blue-50/90 to-indigo-50/90 hover:from-blue-100/90 hover:to-indigo-100/90 dark:from-blue-900/30 dark:to-indigo-900/30 dark:hover:from-blue-800/40 dark:hover:to-indigo-800/40 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-200 border border-blue-200/30 dark:border-blue-700/30 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <span className={`${iconSizeClasses} text-blue-600 dark:text-blue-400`}>
        {editable ? <Edit className="h-full w-full" /> : <FileText className="h-full w-full" />}
      </span>
    </Button>
  );

  return children || buttonContent;
};
