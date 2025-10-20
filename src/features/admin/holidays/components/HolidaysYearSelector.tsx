'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { URL_PARAMS, URLS } from '@/consts/urls';
import { useRouter } from 'next/navigation';
import { getYearOptions } from '@/lib/date';
import { DISPLAY_YEAR_OPTIONS_LENGTH, DISPLAY_YEAR_OPTIONS_OFFSET } from '@/consts/date';
import { startTransition, useCallback, useMemo } from 'react';

type HolidaysYearSelectorProps = {
  currentYear: number;
};

const HolidaysYearSelector = ({ currentYear }: HolidaysYearSelectorProps) => {
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

  return (
    <Select value={currentYear.toString()} onValueChange={handleYearChange}>
      <SelectTrigger className="w-32 bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-500">
        <SelectValue placeholder="年を選択" />
      </SelectTrigger>
      <SelectContent>{yearSelectItems}</SelectContent>
    </Select>
  );
};

export default HolidaysYearSelector;
