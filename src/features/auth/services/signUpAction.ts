'use server';
import { SignUpSchema } from '@/features/auth/lib/formSchema';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { SignUpActionResult } from '../type/signUpType';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
export const signUpAction = async (data: z.infer<typeof SignUpSchema>): Promise<SignUpActionResult> => {
  try {
    const submission = SignUpSchema.safeParse(data);
    if (!submission.success) {
      return {
        isSuccess: false,
        error: { message: submission.error.message },
      };
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (existingUser) {
      return {
        isSuccess: false,
        error: { message: 'このメールアドレスは既に登録されています。' },
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const insertResult = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        hashedPassword,
        roleId: '123e4567-e89b-12d3-a456-426614176004',
      })
      .returning();

    if (!insertResult || insertResult.length === 0) {
      console.error('User insert failed: No data returned');
      return {
        isSuccess: false,
        error: { message: '新規登録に失敗しました。' },
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
    console.error('SignUp error:', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
        case 'CallbackRouteError':
          return {
            isSuccess: false,
            error: { message: '新規登録に失敗しました。' },
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
