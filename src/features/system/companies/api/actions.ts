import { CompanySchema } from '../lib/formSchema';
import { db } from '@/lib/db/drizzle';
import { companies } from '@/lib/db/schema';
import { z } from 'zod';
import { UpsertStateResult } from '@/lib/db/types';
import { URLS } from '@/consts/urls';
import { eq } from 'drizzle-orm';

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
        isSuccess: false,
        error: { message: 'テナント登録に失敗しました。' },
      };
    }
    return {
      isSuccess: true,
      data: { redirectUrl: URLS.SYSTEM_COMPANIES },
    };
  } catch (error) {
    console.error('Error creating company:', error);
    return {
      isSuccess: false,
      error: { message: 'テナント登録に失敗しました。' },
    };
  }
};

export const editCompanyAction = async (values: z.infer<typeof CompanySchema>): Promise<UpsertStateResult> => {
  try {
    const result = await db
      .update(companies)
      .set({
        companyName: values.companyName,
        domain: values.domain,
      })
      .where(eq(companies.id, values.domain))
      .returning();
    if (!result || result.length === 0) {
      console.error('Companies update failed: No data returned');
      return {
        isSuccess: false,
        error: { message: 'テナント更新に失敗しました。' },
      };
    }
    return {
      isSuccess: true,
      data: { redirectUrl: URLS.SYSTEM_COMPANIES },
    };
  } catch (error) {
    console.error('Error updating company:', error);
    return {
      isSuccess: false,
      error: { message: 'テナント更新に失敗しました。' },
    };
  }
};
