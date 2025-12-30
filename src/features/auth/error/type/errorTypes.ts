import { AUTH_ERROR_CODES } from '@/features/auth/const/authErrorConst';

export type AuthErrorType = (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];

export interface ErrorInfo {
  title: string;
  description: string;
}

export interface AuthErrorParams {
  error: AuthErrorType | null;
  existingProvider?: string | null;
}