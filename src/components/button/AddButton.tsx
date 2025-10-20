import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ComponentProps } from 'react';

type AddButtonProps = ComponentProps<typeof Button> & {
  label: string;
  isLoading?: boolean;
};

export const AddButton = ({
  label,
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}: AddButtonProps) => {
  const buttonContent = (
    <Button
      disabled={disabled || isLoading}
      className={`
        bg-gradient-to-r from-blue-600 to-indigo-600 
        hover:from-blue-700 hover:to-indigo-700 
        dark:from-blue-500 dark:to-indigo-500 
        dark:hover:from-blue-600 dark:hover:to-indigo-600 
        text-white shadow-sm hover:shadow-md 
        focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 
        dark:focus:ring-blue-400/40 
        transition-all duration-200 
        font-medium backdrop-blur-sm 
        hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `.trim()}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        </>
      ) : (
        <>
          <Plus className="h-4 w-4 mr-2" />
          {label}
        </>
      )}
    </Button>
  );

  return children || buttonContent;
};
