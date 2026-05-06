'use server';

import { put } from '@vercel/blob';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { URLS } from '@/consts/urls';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { UpdateAccountValues } from '../lib/formSchema';

export const updateAccountAction = async (values: UpdateAccountValues): Promise<ActionStateResult> => {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: '認証が必要です' };

    const userId = session.user.id;

    let imageUrl: string | undefined;

    if (values.avatarFile && values.avatarFile.length > 0) {
      const file = values.avatarFile[0];
      const filename = `avatars/${userId}/${Date.now()}-${file.name}`;
      const blob = await put(filename, file, {
        access: 'private',
        addRandomSuffix: true,
      });
      imageUrl = blob.url;
    }

    await db
      .update(users)
      .set({
        name: values.name,
        ...(imageUrl && { image: imageUrl }),
      })
      .where(eq(users.id, userId));

    revalidatePath(URLS.ACCOUNT, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
