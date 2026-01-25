'use server';
import { db } from '@/lib/db/drizzle';
import { FetchUsersDataResponse } from '../type/fetchResultResponse';

export const fetchUsers = async (): Promise<FetchUsersDataResponse> => {
  try {
    const usersData = await db.query.users.findMany({
      with: {
        company: true,
        department: true,
        role: true,
      },
      orderBy: (users, { asc }) => [asc(users.companyId), asc(users.name)],
    });
    const companies = await db.query.companies.findMany();
    const allRoles = await db.query.roles.findMany();
    return { usersData, companies, allRoles };
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    throw error;
  }
};
