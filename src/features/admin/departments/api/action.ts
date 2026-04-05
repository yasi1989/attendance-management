'use server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { URLS } from '@/consts/urls';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { departments } from '@/lib/db/schema';
import { actionErrorHandler } from '@/lib/errorHandler';
import {
  ensureUniqueDepartmentNameInCompany,
  ensureValidManagerInCompany,
  ensureValidParentDepartment,
} from '../lib/actionValidate';
import { DepartmentSchema } from '../lib/formSchema';
import { requireDepartmentManagement } from '../lib/roleGuard';

export const addDepartmentAction = async (values: z.infer<typeof DepartmentSchema>): Promise<ActionStateResult> => {
  try {
    const { departmentName, parentDepartmentId, managerUserId } = values;
    const user = await requireDepartmentManagement();

    const nameError = await ensureUniqueDepartmentNameInCompany(departmentName, user.companyId);
    if (nameError) return nameError;
    const parentError = await ensureValidParentDepartment(parentDepartmentId, user.companyId);
    if (parentError) return parentError;
    const managerError = await ensureValidManagerInCompany(managerUserId, user.companyId);
    if (managerError) return managerError;

    await db.insert(departments).values({
      departmentName,
      parentDepartmentId: parentDepartmentId ?? null,
      managerUserId: managerUserId ?? null,
      companyId: user.companyId,
    });
    revalidatePath(URLS.ADMIN_DEPARTMENTS, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const editDepartmentAction = async (values: z.infer<typeof DepartmentSchema>): Promise<ActionStateResult> => {
  try {
    const { id, departmentName, parentDepartmentId, managerUserId } = values;
    const user = await requireDepartmentManagement();

    const nameError = await ensureUniqueDepartmentNameInCompany(departmentName, user.companyId, id);
    if (nameError) return nameError;
    const parentError = await ensureValidParentDepartment(parentDepartmentId, user.companyId, id);
    if (parentError) return parentError;
    const managerError = await ensureValidManagerInCompany(managerUserId, user.companyId);
    if (managerError) return managerError;

    await db
      .update(departments)
      .set({
        departmentName,
        parentDepartmentId: parentDepartmentId ?? null,
        managerUserId: managerUserId ?? null,
      })
      .where(and(eq(departments.id, id), eq(departments.companyId, user.companyId)));
    revalidatePath(URLS.ADMIN_DEPARTMENTS, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const deleteDepartmentAction = async (id: string): Promise<ActionStateResult> => {
  try {
    const user = await requireDepartmentManagement();

    const children = await db
      .select({ id: departments.id })
      .from(departments)
      .where(and(eq(departments.parentDepartmentId, id), eq(departments.companyId, user.companyId)));
    if (children.length > 0) {
      return { success: false, error: '子部署が存在するため削除できません。先に子部署を削除してください。' };
    }

    const result = await db
      .delete(departments)
      .where(and(eq(departments.id, id), eq(departments.companyId, user.companyId)));
    if (result.rowCount === 0) {
      return { success: false, error: '部署が見つかりませんでした。' };
    }

    revalidatePath(URLS.ADMIN_DEPARTMENTS, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
