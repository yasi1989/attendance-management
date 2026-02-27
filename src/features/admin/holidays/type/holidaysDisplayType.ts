import { HolidayCategoryType } from '@/types/holiday';

export interface HolidayDisplay {
  id: string;
  name: string;
  holidayDate: Date;
  type: HolidayCategoryType;
}

export type NationalHolidayDisplay = {
  id: string;
  name: string;
  holidayDate: Date;
  type: 'National';
  companyId?: never;
  createdAt: Date;
  updatedAt: Date;
};
