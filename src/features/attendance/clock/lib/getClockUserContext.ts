import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { Result } from '@/lib/result';
import { CLOCK_USER_TYPE } from '../consts/constants';
import { ClockUserContext } from '../types/types';

export const getClockUserContext = async (userId: string): Promise<Result<ClockUserContext>> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { companyId: true, roleId: true },
  });

  if (!user) return { success: false, error: new Error('ユーザーが見つかりませんでした') };

  if (user.companyId)
    return { success: true, data: { type: CLOCK_USER_TYPE.WITH_COMPANY, userId, companyId: user.companyId } };

  return { success: true, data: { type: CLOCK_USER_TYPE.PERSONAL, userId } };
};
