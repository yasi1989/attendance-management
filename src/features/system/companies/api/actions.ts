'use server';
import { db } from '@/lib/db/drizzle';
import { companies } from '@/lib/db/schema';
import { z } from 'zod';
import { ActionStateResult } from '@/lib/actionTypes';
import { eq } from 'drizzle-orm';
import { actionErrorHandler } from '@/lib/errorHandler';
import { revalidatePath } from 'next/cache';
import { URLS } from '@/consts/urls';
import { AddCompanySchema, EditCompanySchema } from '../lib/formSchema';

export const addCompanyAction = async (values: z.infer<typeof AddCompanySchema>): Promise<ActionStateResult> => {
  try {
    const { companyName, domain } = values;
    const company = await db.query.companies.findFirst({ where: eq(companies.domain, domain) });
    if (company) {
      return { success: false, error: 'ドメインが重複しています。' };
    }
    await db.insert(companies).values({
      companyName,
      domain,
    });
    revalidatePath(URLS.SYSTEM_COMPANIES);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const editCompanyAction = async (values: z.infer<typeof EditCompanySchema>): Promise<ActionStateResult> => {
  try {
    const { id, companyName, domain } = values;

    const currentCompany = await db.query.companies.findFirst({ where: eq(companies.id, id) });
    if (!currentCompany) {
      return { success: false, error: '会社が見つかりませんでした。' };
    }
    if (currentCompany.domain !== domain) {
      const company = await db.query.companies.findFirst({ where: eq(companies.domain, domain) });
      if (company) {
        return { success: false, error: 'ドメインが重複しています。' };
      }
    }
    await db
      .update(companies)
      .set({
        companyName,
        domain,
      })
      .where(eq(companies.id, id));
    revalidatePath(URLS.SYSTEM_COMPANIES);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const deleteCompanyAction = async (id: string): Promise<ActionStateResult> => {
  try {
    console.log(id);
    const company = await db.query.companies.findFirst({ where: eq(companies.id, id) });
    if (!company) {
      return { success: false, error: '会社が見つかりませんでした。' };
    }
    await db.delete(companies).where(eq(companies.id, id));
    revalidatePath(URLS.SYSTEM_COMPANIES);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
