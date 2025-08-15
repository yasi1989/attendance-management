'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { CalendarDays } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { startTransition, useCallback, useMemo } from 'react';
import { URL_PARAMS, URLS } from '@/consts/urls';
import { getMonthOptions, getYearOptions } from '@/lib/date';
import {
  DISPLAY_MONTH_OPTIONS_LENGTH,
  DISPLAY_MONTH_OPTIONS_OFFSET,
  DISPLAY_YEAR_OPTIONS_LENGTH,
  DISPLAY_YEAR_OPTIONS_OFFSET,
} from '@/consts/date';
import { STATUS_WITH_ALL } from '@/consts/status';
import { StatusTypeWithAll } from '@/types/statusType';

type ApprovalFilterSelectorProps = {
  currentYear: number;
  currentMonth: number;
  currentStatus: StatusTypeWithAll;
};

const ApprovalFilterSelector = ({ currentYear, currentMonth, currentStatus }: ApprovalFilterSelectorProps) => {
  const router = useRouter();
  const yearOptions = getYearOptions(currentYear, DISPLAY_YEAR_OPTIONS_LENGTH, DISPLAY_YEAR_OPTIONS_OFFSET);
  const months = getMonthOptions(DISPLAY_MONTH_OPTIONS_LENGTH, DISPLAY_MONTH_OPTIONS_OFFSET);
  const yearSelectItems = useMemo(
    () =>
      yearOptions.map((year) => (
        <SelectItem key={year} value={String(year)}>
          {year}年
        </SelectItem>
      )),
    [yearOptions],
  );
  const monthSelectItems = useMemo(
    () =>
      months.map((month) => (
        <SelectItem key={month} value={String(month)}>
          {month}月
        </SelectItem>
      )),
    [months],
  );
  const statusSelectItems = useMemo(
    () =>
      Object.values(STATUS_WITH_ALL).map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      )),
    [],
  );

  const updateUrlParams = useCallback(
    (key: string, value: string) => {
      startTransition(() => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set(key, value);
        router.push(`${URLS.APPROVAL}?${urlParams.toString()}`);
      });
    },
    [router],
  );

  const handleYearChange = useCallback(
    (selectedYear: string) => {
      updateUrlParams(URL_PARAMS.expense.YEAR, selectedYear);
    },
    [updateUrlParams],
  );

  const handleMonthChange = useCallback(
    (selectedMonth: string) => {
      updateUrlParams(URL_PARAMS.expense.MONTH, selectedMonth);
    },
    [updateUrlParams],
  );

  const handleStatusChange = useCallback(
    (selectedStatus: string) => {
      updateUrlParams(URL_PARAMS.expense.STATUS, selectedStatus);
    },
    [updateUrlParams],
  );

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
          <SelectContent>{yearSelectItems}</SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">月:</Label>
        <Select value={String(currentMonth)} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>{monthSelectItems}</SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">状態:</Label>
        <Select value={currentStatus} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>{statusSelectItems}</SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ApprovalFilterSelector;
