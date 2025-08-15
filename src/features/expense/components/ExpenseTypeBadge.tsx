import { Badge } from '@/components/ui/badge';
import { EXPENSE_CATEGORIES } from '@/consts/expense';
import { getExpenseTypeName } from '@/lib/expense';
import { cn } from '@/lib/utils';
import { ExpenseCategoryType } from '@/types/expense';

interface ExpenseTypeBadgeProps {
  status: ExpenseCategoryType;
  className?: string;
}

const getExpenseTypeStyle = (status: ExpenseCategoryType) => {
  switch (status) {
    case EXPENSE_CATEGORIES.TRANSPORT.value:
      return 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    case EXPENSE_CATEGORIES.GENERAL.value:
      return 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
    default:
      return 'bg-gray-50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800';
  }
};

const ExpenseTypeBadge = ({ status, className }: ExpenseTypeBadgeProps) => {
  const style = getExpenseTypeStyle(status);

  return <Badge className={cn(style, className)}>{getExpenseTypeName(status)}</Badge>;
};

export default ExpenseTypeBadge;
