import { HOLIDAY_CATEGORIES, HOLIDAY_CATEGORIES_WITH_ALL } from '@/consts/holiday';

export type HolidayCategoryType = (typeof HOLIDAY_CATEGORIES)[keyof typeof HOLIDAY_CATEGORIES]['value'];
export type HolidayCategoryTypeWithAll = (typeof HOLIDAY_CATEGORIES_WITH_ALL)[keyof typeof HOLIDAY_CATEGORIES_WITH_ALL]['value'];