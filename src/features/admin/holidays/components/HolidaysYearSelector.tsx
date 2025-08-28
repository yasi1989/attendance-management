'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { URL_PARAMS, URLS } from '@/consts/urls';
import { useRouter } from 'next/navigation';
import { getYearOptions } from '@/lib/date';
import { DISPLAY_YEAR_OPTIONS_LENGTH, DISPLAY_YEAR_OPTIONS_OFFSET } from '@/consts/date';
import { startTransition, useCallback, useMemo } from 'react';
import { CalendarDays } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { HOLIDAY_CATEGORIES_WITH_ALL } from '@/consts/holiday';
import { HolidayCategoryTypeWithAll } from '@/types/holiday';

type HolidaysYearSelectorProps = {
  currentYear: number;
  currentCategory: HolidayCategoryTypeWithAll;
};

const HolidaysYearSelector = ({ currentYear, currentCategory }: HolidaysYearSelectorProps) => {
  const router = useRouter();
  const yearOptions = getYearOptions(currentYear, DISPLAY_YEAR_OPTIONS_LENGTH, DISPLAY_YEAR_OPTIONS_OFFSET);
  const yearSelectItems = useMemo(
    () =>
      yearOptions.map((year) => (
        <SelectItem key={year} value={String(year)}>
          {year}年
        </SelectItem>
      )),
    [yearOptions],
  );
  const categoryOptions = useMemo(
    () =>
      Object.values(HOLIDAY_CATEGORIES_WITH_ALL).map((category) => (
        <SelectItem key={category.value} value={category.value}>
          {category.label}
        </SelectItem>
      )),
    [],
  );

  const updateUrlParams = useCallback(
    (key: string, value: string) => {
      startTransition(() => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set(key, value);
        router.push(`${URLS.ADMIN_HOLIDAYS}?${urlParams.toString()}`);
      });
    },
    [router],
  );

  const handleYearChange = useCallback(
    (selectedYear: string) => {
      updateUrlParams(URL_PARAMS.adminHolidays.YEAR, selectedYear);
    },
    [updateUrlParams],
  );

  const handleCategoryChange = useCallback(
    (selectedCategory: string) => {
      updateUrlParams(URL_PARAMS.adminHolidays.CATEGORY, selectedCategory);
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
        <Select value={currentYear.toString()} onValueChange={handleYearChange}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="年を選択" />
          </SelectTrigger>
          <SelectContent>{yearSelectItems}</SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">種別:</Label>
        <Select value={currentCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="種別を選択" />
          </SelectTrigger>
          <SelectContent>{categoryOptions}</SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HolidaysYearSelector;
