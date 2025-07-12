'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

type HolidaysYearSelectorProps = {
  currentYear: number;
};

const HolidaysYearSelector = ({ currentYear }: HolidaysYearSelectorProps) => {
  const router = useRouter();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const handleYearChange = (selectedYear: string) => {
    router.push(`/admin/holidays?year=${selectedYear}`);
  };

  return (
    <Select value={currentYear.toString()} onValueChange={handleYearChange}>
      <SelectTrigger className="w-32 bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-500">
        <SelectValue placeholder="年を選択" />
      </SelectTrigger>
      <SelectContent>
        {yearOptions.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}年
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default HolidaysYearSelector;
