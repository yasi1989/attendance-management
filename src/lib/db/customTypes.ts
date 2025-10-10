import { customType } from 'drizzle-orm/pg-core';

export const dateOnly = customType<{
  data: Date;
  driverData: string;
}>({
  dataType: () => 'date',
  fromDriver: (value: string) => {
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d);
  },
  toDriver: (value: Date) => {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, '0');
    const d = String(value.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },
});
