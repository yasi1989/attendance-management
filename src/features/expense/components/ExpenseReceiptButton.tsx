'use client';

import { Receipt } from 'lucide-react';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { URLS } from '@/consts/urls';

type ExpenseReceiptButtonProps = {
  receiptUrl: string;
};

const ExpenseReceiptButton = ({ receiptUrl }: ExpenseReceiptButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const url = new URL(URLS.API_BLOB, window.location.origin);
      const pathname = new URL(receiptUrl).pathname.slice(1);
      url.searchParams.set('pathname', pathname);
      window.open(url.toString(), '_blank', 'noopener noreferrer');
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={isPending}
      className="h-6 w-6 md:h-8 md:w-8 rounded-md bg-linear-to-r from-emerald-50/90 to-teal-50/90 hover:from-emerald-100/90 hover:to-teal-100/90 dark:from-emerald-900/30 dark:to-teal-900/30 dark:hover:from-emerald-800/40 dark:hover:to-teal-800/40 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-200 border border-emerald-200/30 dark:border-emerald-700/30 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Receipt className="h-3 w-3 md:h-4 md:w-4 text-emerald-600 dark:text-emerald-400" />
    </Button>
  );
};

export default ExpenseReceiptButton;
