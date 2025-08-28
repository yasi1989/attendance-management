import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { companies } from "./db/schema";

export type UpsertStateResult = {
  error?: string | undefined;
  success: boolean;
};

export type Company = InferSelectModel<typeof companies>;
export type InsertCompany = InferInsertModel<typeof companies>
