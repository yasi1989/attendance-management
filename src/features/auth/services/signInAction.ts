'use server';
import { credentialsSignIn } from '../lib/authUtils';
import { SignInSchema } from '../lib/formSchema';
import z from 'zod';
import { AuthResult } from '../type/authResult';
import { URLS } from '@/consts/urls';

export const signInAction = async (data: z.infer<typeof SignInSchema>): Promise<AuthResult> => {
  try {
    const submission = SignInSchema.safeParse(data);
    if (!submission.success) {
      return {
        isSuccess: false,
        error: { message: submission.error.message },
      };
    }

    const signInResult = await credentialsSignIn(submission.data.email, submission.data.password);

    if (!signInResult.isSuccess) {
      return {
        isSuccess: false,
        error: { message: signInResult.error?.message || 'ログインに失敗しました' },
      };
    }

    return {
      isSuccess: true,
      data: { redirectUrl: URLS.ATTENDANCE_CALENDAR },
    };
  } catch (error) {
    console.error('SignIn action error:', error);
    return {
      isSuccess: false,
      error: { message: 'ログイン処理中にエラーが発生しました。' },
    };
  }
};
