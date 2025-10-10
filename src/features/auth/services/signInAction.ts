'use server';
import { signIn } from '@/auth';
import { SignInSchema } from '../lib/formSchema';
import z from 'zod';
import { AuthError } from 'next-auth';
import { ActionStateResult } from '@/lib/actionTypes';

export const signInAction = async (data: z.infer<typeof SignInSchema>): Promise<ActionStateResult> => {
  try {
    const submission = SignInSchema.safeParse(data);
    if (!submission.success) {
      return {
        success: false,
        error: submission.error.message,
      };
    }

    await signIn('credentials', {
      email: submission.data.email,
      password: submission.data.password,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Signin error:', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
        case 'CallbackRouteError':
          return {
            success: false,
            error: 'メールアドレスまたはパスワードが間違っています',
          };
        default:
          return {
            success: false,
            error: '認証処理でエラーが発生しました。',
          };
      }
    }
    return {
      success: false,
      error: '認証処理でエラーが発生しました。',
    };
  }
};
