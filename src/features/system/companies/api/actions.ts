'use server';
import { CompanySchema } from '../lib/formSchema';
import { db } from '@/lib/db/drizzle';
import { companies } from '@/lib/db/schema';
import { z } from 'zod';
import { UpsertStateResult } from '@/lib/db/types';
import { eq } from 'drizzle-orm';
import { handleError } from '@/lib/actionErrorHandler';

export const addCompanyAction = async (values: z.infer<typeof CompanySchema>): Promise<UpsertStateResult> => {
  try {
    const result = await db
      .insert(companies)
      .values({
        companyName: values.companyName,
        domain: values.domain,
      })
      .returning();
    if (!result || result.length === 0) {
      console.error('Companies insert failed: No data returned');
      return {
        success: false,
        error: 'テナント登録に失敗しました。',
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const editCompanyAction = async (values: z.infer<typeof CompanySchema>): Promise<UpsertStateResult> => {
  try {
    const result = await db
      .update(companies)
      .set({
        id: values.id,
        companyName: values.companyName,
        domain: values.domain,
      })
      .where(eq(companies.id, values.id))
      .returning();
    if (!result || result.length === 0) {
      console.error('Companies update failed: No data returned');
      return {
        success: false,
        error: 'テナント更新に失敗しました。',
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
};
