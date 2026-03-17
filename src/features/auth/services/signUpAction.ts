'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { ROLE } from '@/consts/role';
import { URLS } from '@/consts/urls';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { createLinkedAccountErrorMessage, getLinkedAccounts } from '../lib/accountValidation';
import { credentialsSignIn } from '../lib/authUtils';
import { SignUpSchema } from '../lib/formSchema';
import { getRoleByCode } from '../lib/roleCache';
import { checkExistingUser } from '../lib/userValidation';
import { AuthResult } from '../type/authResult';

export const signUpAction = async (data: z.infer<typeof SignUpSchema>): Promise<AuthResult> => {
  try {
    const submission = SignUpSchema.safeParse(data);

    if (!submission.success) {
      return {
        isSuccess: false,
        error: { message: submission.error.errors[0]?.message || 'バリデーションエラー' },
      };
    }

    const userCheck = await checkExistingUser(data.email);

    if (userCheck.exists) {
      if (userCheck.hasPassword) {
        return {
          isSuccess: false,
          error: { message: 'このメールアドレスは既に登録されています。' },
        };
      }

      if (userCheck.userId) {
        const linkedAccountsInfo = await getLinkedAccounts(userCheck.userId);

        if (linkedAccountsInfo.hasLinkedAccounts) {
          return {
            isSuccess: false,
            error: {
              message: createLinkedAccountErrorMessage(linkedAccountsInfo.providerNames),
            },
          };
        }
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
    revalidatePath(URLS.ROOT, 'layout');

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
