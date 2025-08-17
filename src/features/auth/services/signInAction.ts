'use server';
import { signIn } from '@/auth';
import { SignInSchema } from '../lib/formSchema';
import z from 'zod';
import { AuthError } from 'next-auth';
import { UpsertStateResult } from '@/lib/db/types';
import { URLS } from '@/consts/urls';

export const signInAction = async (data: z.infer<typeof SignInSchema>): Promise<UpsertStateResult> => {
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
      data: { redirectUrl: URLS.ATTENDANCE_CALENDAR },
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
