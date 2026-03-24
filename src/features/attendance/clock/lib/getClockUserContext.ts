import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { roles, users } from '@/lib/db/schema';

export type ClockUserContext =
  | { type: 'system_admin' }
  | { type: 'with_company'; userId: string; companyId: string }
  | { type: 'personal'; userId: string };

export const getClockUserContext = async (userId: string): Promise<ClockUserContext> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { companyId: true, roleId: true },
  });

  if (!user?.roleId) return { type: 'personal', userId };

  const role = await db.query.roles.findFirst({
    where: eq(roles.id, user.roleId),
    columns: { isSystemRole: true },
  });

  if (role?.isSystemRole) return { type: 'system_admin' };
  if (user.companyId) return { type: 'with_company', userId, companyId: user.companyId };

  return { type: 'personal', userId };
};
