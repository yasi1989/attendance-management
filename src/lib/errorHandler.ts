import { UpsertStateResult } from "@/lib/actionTypes";
import z from "zod";

export function actionErrorHandler(error: unknown): UpsertStateResult {
    if (error instanceof z.ZodError) {
      return {
        error: error.errors.map((e) => e.message).join(","),
        success: false,
      };
    }
    if (error instanceof Error) {
      return {
        error: error.message,
        success: false,
      };
    }
    return {
      error: "システム異常が発生しました。",
      success: false,
    };
  }