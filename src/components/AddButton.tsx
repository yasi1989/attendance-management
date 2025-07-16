import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ComponentProps } from 'react';

type AddButtonProps = ComponentProps<typeof Button> & {
  label: string;
  iconSize?: number;
};

const AddButton = ({ label, iconSize = 18, ...props }: AddButtonProps) => {
  return (
    <Button
      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 dark:text-white hover:to-blue-700 hover:shadow-md hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-transform"
      {...props}
    >
      <PlusCircle size={iconSize} />
      {label}
    </Button>
  );
};

export default AddButton;
