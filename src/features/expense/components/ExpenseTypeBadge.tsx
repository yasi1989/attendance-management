import { Badge } from '@/components/ui/badge';
import { cn } from '@/libs/utils';
import { ExpenseTypeDB } from '../type/ExpenseType';

interface ExpenseTypeBadgeProps {
  status: ExpenseTypeDB;
  className?: string;
}

const getExpenseTypeStyle = (status: ExpenseTypeDB) => {
  switch (status) {
    case 'Transport':
      return 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    case 'General':
      return 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
    default:
      return 'bg-gray-50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800';
  }
};

export const getExpenseTypeName = (status: ExpenseTypeDB) => {
  switch (status) {
    case 'Transport':
      return '交通費';
    case 'General':
      return '一般経費';
    default:
      return '';
  }
};

const ExpenseTypeBadge = ({ status, className }: ExpenseTypeBadgeProps) => {
  const style = getExpenseTypeStyle(status);

  return <Badge className={cn(style, className)}>{getExpenseTypeName(status)}</Badge>;
};

export default ExpenseTypeBadge;
