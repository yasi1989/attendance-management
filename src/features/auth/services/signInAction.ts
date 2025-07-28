'use server';
import { signIn } from '@/auth';
import { SignInSchema } from '../lib/formSchema';
import { SignInActionResult } from '../type/signInType';
import z from 'zod';
import { AuthError } from 'next-auth';

export const signInAction = async (data: z.infer<typeof SignInSchema>): Promise<SignInActionResult> => {
  try {
    const submission = SignInSchema.safeParse(data);
    if (!submission.success) {
      return {
        isSuccess: false,
        error: { message: submission.error.message },
      };
    }

    await signIn('credentials', {
      email: submission.data.email,
      password: submission.data.password,
      redirect: false,
    });

    return {
      isSuccess: true,
      data: { redirectUrl: '/attendance/calendar' },
    };
  } catch (error) {
    console.error('Signin error:', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
        case 'CallbackRouteError':
          return {
            isSuccess: false,
            error: { message: 'メールアドレスまたはパスワードが間違っています' },
          };
        default:
          return {
            isSuccess: false,
            error: { message: '認証処理でエラーが発生しました。' },
          };
      }
    }
    return {
      isSuccess: false,
      error: { message: '認証処理でエラーが発生しました。' },
    };
  }
};
