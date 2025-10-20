import { Button } from '@/components/ui/button';
import { Receipt } from 'lucide-react';

type ViewButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  size?: 'sm' | 'md';
  className?: string;
  href?: string;
  target?: '_blank' | '_self';
};

export const ViewButton = ({
  onClick,
  disabled = false,
  children,
  size = 'md',
  className = '',
  href,
  target = '_blank',
}: ViewButtonProps) => {
  const sizeClasses = size === 'sm' ? 'h-6 w-6' : 'h-6 w-6 md:h-8 md:w-8';
  const iconSizeClasses = size === 'sm' ? 'h-3 w-3' : 'h-3 w-3 md:h-4 md:w-4';

  const buttonContent = (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClasses} rounded-md bg-gradient-to-r from-emerald-50/90 to-teal-50/90 hover:from-emerald-100/90 hover:to-teal-100/90 dark:from-emerald-900/30 dark:to-teal-900/30 dark:hover:from-emerald-800/40 dark:hover:to-teal-800/40 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-200 border border-emerald-200/30 dark:border-emerald-700/30 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Receipt className={`${iconSizeClasses} text-emerald-600 dark:text-emerald-400`} />
    </Button>
  );

  const finalButton = children || buttonContent;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className="inline-block"
      >
        {finalButton}
      </a>
    );
  }

  return finalButton;
};
