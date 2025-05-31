import { holidays } from '../const/mockData';
import { HolidayType } from '../type/holidayType';

export const fetchHolidays = (): HolidayType[] => {
  return holidays;
};
