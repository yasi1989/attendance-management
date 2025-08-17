import { CompanySchema } from '../lib/formSchema';
import { db } from '@/lib/db/drizzle';
import { companies } from '@/lib/db/schema';
import { z } from 'zod';
import { UpsertStateResult } from '@/lib/db/types';
import { URLS } from '@/consts/urls';

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
