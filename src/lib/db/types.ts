import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { companies } from "./schema";

export type UpsertStateResult =
  | {
      isSuccess: true;
      data?: {
        redirectUrl?: string;
      };
    }
  | {
      isSuccess: false;
      error: {
        message: string;
      };
    };



export type Company = InferSelectModel<typeof companies>;
export type InsertCompany = InferInsertModel<typeof companies>
