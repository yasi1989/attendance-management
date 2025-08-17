'use server';

import { db } from '@/lib/db/drizzle';
import { Company } from '@/lib/db/types';

export const fetchCompanies = async (): Promise<Company[]> => {
  try {
    return await db.query.companies.findMany({
      orderBy: (companies, { desc }) => [desc(companies.createdAt)],
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};