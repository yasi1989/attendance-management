'use server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { URLS } from '@/consts/urls';
import { requireCompanyAdmin } from '@/features/auth/lib/authRoleUtils';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { departments } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import { validateDepartmentName, validateManager, validateParentDepartment } from '../lib/actionValidate';
import { DepartmentSchema } from '../lib/formSchema';

export const addDepartmentAction = async (values: z.infer<typeof DepartmentSchema>): Promise<ActionStateResult> => {
  try {
    const { departmentName, parentDepartmentId, managerUserId } = values;
    const { user } = await requireCompanyAdmin();

    const nameError = await validateDepartmentName(departmentName, user.companyId);
    if (nameError) return nameError;
    const parentError = await validateParentDepartment(parentDepartmentId, user.companyId);
    if (parentError) return parentError;
    const managerError = await validateManager(managerUserId, user.companyId);
    if (managerError) return managerError;

    await db.insert(departments).values({
      departmentName,
      parentDepartmentId: parentDepartmentId ?? null,
      managerUserId: managerUserId ?? null,
      companyId: user.companyId,
    });

    revalidatePath(URLS.ADMIN_DEPARTMENTS);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const editDepartmentAction = async (values: z.infer<typeof DepartmentSchema>): Promise<ActionStateResult> => {
  try {
    const { id, departmentName, parentDepartmentId, managerUserId } = values;
    const { user } = await requireCompanyAdmin();

    const nameError = await validateDepartmentName(departmentName, user.companyId, id);
    if (nameError) return nameError;
    const parentError = await validateParentDepartment(parentDepartmentId, user.companyId, id);
    if (parentError) return parentError;
    const managerError = await validateManager(managerUserId, user.companyId);
    if (managerError) return managerError;

    await db
      .update(departments)
      .set({
        departmentName,
        parentDepartmentId: parentDepartmentId ?? null,
        managerUserId: managerUserId ?? null,
      })
      .where(and(eq(departments.id, id), eq(departments.companyId, user.companyId)));

    revalidatePath(URLS.ADMIN_DEPARTMENTS);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const deleteDepartmentAction = async (id: string): Promise<ActionStateResult> => {
  try {
    const { user } = await requireCompanyAdmin();

    const result = await db
      .delete(departments)
      .where(and(eq(departments.id, id), eq(departments.companyId, user.companyId)));
    if (result.rowCount === 0) {
      return { success: false, error: '部署が見つかりませんでした。' };
    }

    revalidatePath(URLS.ADMIN_DEPARTMENTS);
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
