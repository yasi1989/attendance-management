import { format as formatTZ, toZonedTime } from 'date-fns-tz';
import { customType } from 'drizzle-orm/pg-core';
import { JST } from '@/consts/date';

export const dateOnly = customType<{
  data: Date;
  driverData: string;
}>({
  dataType: () => 'date',
  fromDriver: (value: string) => {
    const [y, m, d] = value.split('-').map(Number);
    return toZonedTime(new Date(Date.UTC(y, m - 1, d)), JST);
  },
  toDriver: (value: Date) => {
    return formatTZ(toZonedTime(value, JST), 'yyyy-MM-dd', { timeZone: JST });
  },
});
