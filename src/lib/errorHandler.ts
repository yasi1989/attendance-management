import z from 'zod';
import { ActionStateResult } from '@/lib/actionTypes';

export function actionErrorHandler(error: unknown): ActionStateResult {
  if (error instanceof z.ZodError) {
    return {
      error: error.errors.map((e) => e.message).join(','),
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
    error: 'システム異常が発生しました。',
    success: false,
  };
}
