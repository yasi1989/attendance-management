'use server';
import { SignUpSchema } from '@/features/auth/lib/formSchema';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { AuthResult } from '../type/authResult';
import { credentialsSignIn } from '../lib/authUtils';
import { RoleType } from '@/types/role';
import { getRoleByCode } from '../lib/roleCashe';
import { ROLE } from '@/consts/role';

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
      return {
        isSuccess: false,
        error: { message: 'このメールアドレスは既に登録されています。' },
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const role: RoleType = await getRoleByCode(ROLE.PERSONAL_USER);

    const insertResult = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        hashedPassword,
        roleId: role.id,
      })
      .returning();

    if (!insertResult || insertResult.length === 0) {
      console.error('User insert failed: No data returned');
      return {
        isSuccess: false,
        error: { message: '新規登録に失敗しました。' },
      };
    }

    const signInResult = await credentialsSignIn(submission.data.email, submission.data.password);

    if (!signInResult.isSuccess) {
      return {
        isSuccess: true,
        data: {
          redirectUrl: '/login',
        },
      };
    }

    return {
      isSuccess: true,
      data: { redirectUrl: '/attendance/calendar' },
    };
  } catch (error) {
    console.error('SignUp error:', error);
    return {
      isSuccess: false,
      error: { message: '新規登録中にエラーが発生しました。' },
    };
  }
};
