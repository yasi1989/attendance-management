import { users } from '@/features/system/users/const/mockData';
import { holidays } from '../const/mockData';
import { HolidayType } from '../type/holidayType';

export const fetchHolidays = async (year?: number): Promise<HolidayType[]> => {

  await new Promise((resolve) => setTimeout(resolve, 300));

  // TODO: 会社に紐づく休日を取得
  const userId = 'u3a2b3c4-5d6e-789f-a1b2-c3d4e5f67892';
  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new Error('ユーザが見つかりません');
  }
  const companyHolidays = holidays.filter((holiday) => holiday.companyId === user.companyId);
  return year ? companyHolidays.filter((holiday) => holiday.holidayDate.getFullYear() === year) : companyHolidays;
};
