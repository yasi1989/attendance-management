'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { CalendarDays } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { startTransition, useCallback } from 'react';
import { URLS } from '@/consts/urls';
import { STATUS_WITH_ALL } from '@/consts/status';
import { StatusTypeWithAll } from '@/types/statusType';
import { URL_PARAMS } from '@/consts/urls';

type ExpenseFilterSelectorProps = {
  currentYear: number;
  currentMonth: number;
  currentStatus: StatusTypeWithAll;
  currentExpenseType: string;
};

const ExpenseFilterSelector = ({
  currentYear,
  currentMonth,
  currentStatus,
  currentExpenseType,
}: ExpenseFilterSelectorProps) => {
  const router = useRouter();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const expenseTypeOptions = [
    { value: 'All', label: 'すべて' },
    { value: 'Transport', label: '交通費' },
    { value: 'General', label: '一般経費' },
  ];

  const updateUrlParams = useCallback(
    (key: string, value: string) => {
      startTransition(() => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set(key, value);
        router.push(`${URLS.EXPENSE}?${urlParams.toString()}`);
      });
    },
    [router],
  );

  const handleYearChange = (selectedYear: string) => {
    updateUrlParams(URL_PARAMS.expense.YEAR, selectedYear);
  };

  const handleMonthChange = (selectedMonth: string) => {
    updateUrlParams(URL_PARAMS.expense.MONTH, selectedMonth);
  };

  const handleStatusChange = (selectedStatus: string) => {
    updateUrlParams(URL_PARAMS.expense.STATUS, selectedStatus);
  };

  const handleExpenseTypeChange = (selectedExpenseType: string) => {
    updateUrlParams(URL_PARAMS.expense.EXPENSE_TYPE, selectedExpenseType);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-blue-100 dark:border-gray-600">
      <div className="flex items-center space-x-2">
        <CalendarDays className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">表示条件:</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">年:</Label>
        <Select value={String(currentYear)} onValueChange={handleYearChange}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}年
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">月:</Label>
        <Select value={String(currentMonth)} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={String(month)}>
                {month}月
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">状態:</Label>
        <Select value={currentStatus} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(STATUS_WITH_ALL).map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">経費種別:</Label>
        <Select value={currentExpenseType} onValueChange={handleExpenseTypeChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {expenseTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ExpenseFilterSelector;
