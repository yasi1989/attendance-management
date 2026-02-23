import { z } from 'zod';

export const NationalHolidayResponseSchema = z.array(
  z.object({
    name: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日付形式が不正です。'),
  }),
);
