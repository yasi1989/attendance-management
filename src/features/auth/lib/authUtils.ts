'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { AuthResult } from '../type/authResult';

export const credentialsSignIn = async (email: string, password: string): Promise<AuthResult> => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { isSuccess: true };
  } catch (error) {
    console.error('Sign-in error:', error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            isSuccess: false,
            error: { message: 'メールアドレスまたはパスワードが間違っています' },
          };
        case 'CallbackRouteError':
          return {
            isSuccess: false,
            error: { message: error.cause?.err?.message || '認証に失敗しました。入力内容を確認してください。' },
          };
        default:
          return {
            isSuccess: false,
            error: { message: '認証処理で予期せぬエラーが発生しました。' },
          };
      }
    }

    return {
      isSuccess: false,
      error: { message: 'サーバーエラーが発生しました。時間をおいて再度お試しください。' },
    };
  }
};
