'use server';
import { ROLE } from '@/consts/role';
import { URLS } from '@/consts/urls';
import { SignUpSchema } from '@/features/auth/lib/formSchema';
import { credentialsSignIn } from '@/features/auth/lib/authUtils';
import { getRoleByCode } from '@/features/auth/lib/roleCache';
import { AuthResult } from '@/features/auth/type/authResult';
import { db } from '@/lib/db/drizzle';
import { accounts, users } from '@/lib/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { getProviderName } from '@/consts/providers';

export const signUpAction = async (data: z.infer<typeof SignUpSchema>): Promise<AuthResult> => {
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
      if (existingUser.hashedPassword) {
        return {
          isSuccess: false,
          error: { message: 'このメールアドレスは既に登録されています。' },
        };
      }

      const existingAccounts = await db.query.accounts.findMany({
        where: eq(accounts.userId, existingUser.id),
      });

      if (existingAccounts.length > 0) {
        const providerNames = existingAccounts.map((acc) => getProviderName(acc.provider));
        return {
          isSuccess: false,
          error: {
            message: `このメールアドレスは既に${providerNames.join(', ')}で登録されています。${providerNames.join(', ')}でログインしてください。`,
          },
        };
      }
    }

    const role = await getRoleByCode(ROLE.PERSONAL_USER);
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const [newUser] = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        hashedPassword,
        roleId: role.id,
      })
      .returning();

    if (!newUser) {
      console.error('User insert failed: No data returned');
      return {
        isSuccess: false,
        error: { message: '新規登録に失敗しました。' },
      };
    }

    const signInResult = await credentialsSignIn(data.email, data.password);

    return {
      isSuccess: true,
      data: {
        redirectUrl: signInResult.isSuccess ? URLS.ATTENDANCE_CALENDAR : URLS.LOGIN,
      },
    };
  } catch (error) {
    console.error('SignUp error:', error);
    return {
      isSuccess: false,
      error: { message: '新規登録中にエラーが発生しました。' },
    };
  }
};
