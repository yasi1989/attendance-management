'use server';

import { Company } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';

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
