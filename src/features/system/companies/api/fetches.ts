'use server';

import { db } from '@/lib/db/drizzle';
import { Company } from '@/lib/actionTypes';

export const fetchCompanies = async (): Promise<Company[]> => {
  try {
    return await db.query.companies.findMany({
      orderBy: (companies, { desc }) => [desc(companies.createdAt)],
    });
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    throw error;
  }
};
