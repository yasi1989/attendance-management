import { and, eq, ne } from 'drizzle-orm';
import { ActionStateResult } from '@/lib/actionTypes';
import { db } from '@/lib/db/drizzle';
import { departments, users } from '@/lib/db/schema';

export const validateParentDepartment = async (
  parentDepartmentId: string | null | undefined,
  companyId: string,
  selfId?: string,
): Promise<ActionStateResult | null> => {
  if (!parentDepartmentId) return null;
  if (selfId && parentDepartmentId === selfId) {
    return { success: false, error: '自分自身を親部署にすることはできません。' };
  }
  const parentDept = await db.query.departments.findFirst({
    where: and(eq(departments.id, parentDepartmentId), eq(departments.companyId, companyId)),
  });
  if (!parentDept) {
    return { success: false, error: '親部署が見つかりませんでした。' };
  }
  return null;
};

export const validateManager = async (
  managerUserId: string | null | undefined,
  companyId: string,
): Promise<ActionStateResult | null> => {
  if (!managerUserId) return null;
  const manager = await db.query.users.findFirst({
    where: and(eq(users.id, managerUserId), eq(users.companyId, companyId)),
  });
  if (!manager) {
    return { success: false, error: '部署管理者が見つかりませんでした。' };
  }
  return null;
};

export const validateDepartmentName = async (
  departmentName: string,
  companyId: string,
  excludeId?: string,
): Promise<ActionStateResult | null> => {
  const whereConditions = excludeId
    ? and(
        eq(departments.companyId, companyId),
        eq(departments.departmentName, departmentName),
        ne(departments.id, excludeId),
      )
    : and(eq(departments.companyId, companyId), eq(departments.departmentName, departmentName));
  const existDepartment = await db.query.departments.findFirst({ where: whereConditions });
  if (existDepartment) {
    return { success: false, error: 'この部署は既に登録されています。' };
  }
  return null;
};
