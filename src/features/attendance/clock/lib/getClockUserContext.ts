import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { CLOCK_USER_TYPE } from '../consts/constants';
import { ClockUserContext } from '../types/types';

export const getClockUserContext = async (userId: string): Promise<ClockUserContext> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { companyId: true, roleId: true },
  });

  if (!user?.roleId) return { type: CLOCK_USER_TYPE.PERSONAL, userId };

  if (user.companyId) return { type: CLOCK_USER_TYPE.WITH_COMPANY, userId, companyId: user.companyId };

  return { type: CLOCK_USER_TYPE.PERSONAL, userId };
};
