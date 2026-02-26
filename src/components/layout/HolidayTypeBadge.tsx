import { Badge } from '@/components/ui/badge';
import { HOLIDAY_CATEGORIES } from '@/consts/holiday';
import { getHolidayCategoryByValue } from '@/lib/holiday';
import { HolidayCategoryType } from '@/types/holiday';

interface HolidayTypeBadgeProps {
  holidayType: HolidayCategoryType;
  className?: string;
}

const HOLIDAY_TYPE_COLORS: Record<HolidayCategoryType, string> = {
  [HOLIDAY_CATEGORIES.NATIONAL.value]:
    'bg-pink-50 dark:bg-pink-950/20 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800',
  [HOLIDAY_CATEGORIES.COMPANY.value]:
    'bg-cyan-50 dark:bg-cyan-950/20 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
};

const HolidayTypeBadge = ({ holidayType, className }: HolidayTypeBadgeProps) => {
  const holidayTypeInfo = getHolidayCategoryByValue(holidayType);
  if (!holidayTypeInfo) return null;
  return (
    <Badge className={`${className} ${HOLIDAY_TYPE_COLORS[holidayTypeInfo.value]}`}>{holidayTypeInfo.label}</Badge>
  );
};

export default HolidayTypeBadge;
