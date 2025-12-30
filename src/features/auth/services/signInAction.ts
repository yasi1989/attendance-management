'use server';

import { URLS } from '@/consts/urls';
import { credentialsSignIn } from '../lib/authUtils';
import { SignInSchema } from '../lib/formSchema';
import { AuthResult } from '../type/authResult';
import { z } from 'zod';

export const signInAction = async (data: z.infer<typeof SignInSchema>): Promise<AuthResult> => {
  try {
    const submission = SignInSchema.safeParse(data);

    if (!submission.success) {
      return {
        isSuccess: false,
        error: { message: submission.error.errors[0]?.message || 'バリデーションエラー' },
      };
    }

    const signInResult = await credentialsSignIn(submission.data.email, submission.data.password);

    if (!signInResult.isSuccess) {
      return signInResult;
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