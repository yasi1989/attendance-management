import { users } from '@/features/system/users/const/mockData';
import { holidays } from '../const/mockData';
import { HolidayType } from '../type/holidayType';

export const fetchHolidays = (): HolidayType[] => {
  // TODO: 会社に紐づく休日を取得
  const userId = 'u3a2b3c4-5d6e-789f-a1b2-c3d4e5f67892';
  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new Error('ユーザが見つかりません');
  }
  const sampleHolidays = holidays.filter((holiday) => holiday.companyId === user.companyId);
  return sampleHolidays;
};
