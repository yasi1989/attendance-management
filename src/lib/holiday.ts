import { HOLIDAY_CATEGORIES, HOLIDAY_CATEGORIES_WITH_ALL_LIST } from '@/consts/holiday';
import { HolidayCategoryType, HolidayCategoryTypeWithAll } from '@/types/holiday';

export const getHolidayCategoryByValue = (value: string) => {
  return Object.values(HOLIDAY_CATEGORIES).find((category) => category.value === value);
};

export const getHolidayCategoryName = (status: HolidayCategoryType) => {
  return getHolidayCategoryByValue(status)?.label;
};

export const isValidHolidayCategoryWithAll = (status: string): status is HolidayCategoryTypeWithAll => {
  return HOLIDAY_CATEGORIES_WITH_ALL_LIST.includes(status as HolidayCategoryTypeWithAll);
};
