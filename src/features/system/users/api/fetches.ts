'use server';
import { db } from '@/lib/db/drizzle';
import { FetchUsersDataResponse } from '../type/fetchResultResponse';

export const fetchUsers = async (): Promise<FetchUsersDataResponse> => {
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
    return { usersData, companies, roles: roles };
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    throw error;
  }
};
