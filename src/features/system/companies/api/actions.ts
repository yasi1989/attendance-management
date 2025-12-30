'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { URLS } from '@/consts/urls';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { companies } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
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
    const [currentCompany, existingCompany] = await Promise.all([
      db.query.companies.findFirst({ where: (companies, { eq }) => eq(companies.id, id) }),
      db.query.companies.findFirst({
        where: (companies, { and, eq, ne }) => and(eq(companies.domain, domain), ne(companies.id, id)),
      }),
    ]);
    if (!currentCompany) {
      return { success: false, error: '会社が見つかりませんでした。' };
    }
    if (currentCompany.domain !== domain && existingCompany) {
      return { success: false, error: 'ドメインが重複しています。' };
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
    const company = await db.query.companies.findFirst({ where: (companies, { eq }) => eq(companies.id, id) });
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
