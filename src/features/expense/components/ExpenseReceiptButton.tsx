'use client';

import { Receipt } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getReceiptUrlAction } from '../api/expenseAction';

type ExpenseReceiptButtonProps = {
  receiptUrl: string;
};

const ExpenseReceiptButton = ({ receiptUrl }: ExpenseReceiptButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await getReceiptUrlAction(receiptUrl);
      if (!result.success) return;
      window.open(result.data, '_blank', 'noopener noreferrer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={isLoading}
      className="h-6 w-6 md:h-8 md:w-8 rounded-md bg-linear-to-r from-emerald-50/90 to-teal-50/90 hover:from-emerald-100/90 hover:to-teal-100/90 dark:from-emerald-900/30 dark:to-teal-900/30 dark:hover:from-emerald-800/40 dark:hover:to-teal-800/40 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-200 border border-emerald-200/30 dark:border-emerald-700/30 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Receipt className="h-3 w-3 md:h-4 md:w-4 text-emerald-600 dark:text-emerald-400" />
    </Button>
  );
};

export default ExpenseReceiptButton;
