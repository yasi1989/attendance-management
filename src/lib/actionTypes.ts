import { InferSelectModel } from 'drizzle-orm';
import { companies } from './db/schema';

export type ActionStateResult = {
  error?: string | undefined;
  success: boolean;
};

export type Company = InferSelectModel<typeof companies>;
