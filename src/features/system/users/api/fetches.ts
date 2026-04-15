'use server';
import { db } from '@/lib/db/drizzle';
import { Result } from '@/lib/result';
import { requireUserManagement } from '../lib/roleGuard';
import { FetchUsersDataResponse } from '../type/fetchResultResponse';

export const fetchUsers = async (): Promise<Result<FetchUsersDataResponse>> => {
  const authResult = await requireUserManagement();
  if (!authResult.success) return { success: false, error: authResult.error };

  try {
    const [usersData, companies, roles] = await Promise.all([
      db.query.users.findMany({
        columns: {
          hashedPassword: false,
          emailVerified: false,
        },
        with: {
          company: true,
          department: true,
          role: true,
        },
        orderBy: (users, { asc }) => [asc(users.companyId), asc(users.name)],
      }),
      db.query.companies.findMany({
        orderBy: (companies, { asc }) => [asc(companies.companyName)],
      }),
      db.query.roles.findMany({
        orderBy: (roles, { asc }) => [asc(roles.roleName)],
      }),
    ]);

    return { success: true, data: { usersData, companies, roles } };
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('データ取得に失敗しました。') };
  }
};