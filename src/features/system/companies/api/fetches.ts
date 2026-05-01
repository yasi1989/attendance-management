'use server';

import { Company } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { Result } from '@/lib/result';
import { requireTenantManagement } from '../lib/roleGuard';

export const fetchCompanies = async (): Promise<Result<Company[]>> => {
  const authResult = await requireTenantManagement();
  if (!authResult.success) return { success: false, error: authResult.error };

  try {
    const data = await db.query.companies.findMany({
      orderBy: (companies, { desc }) => [desc(companies.createdAt)],
    });
    return { success: true, data };
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('データ取得に失敗しました。') };
  }
};