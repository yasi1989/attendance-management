import { ROLE } from '@/consts/role';
import { checkHasCompany, PublicUserWithCompany, requireRole } from '@/features/auth/lib/authGuard';
import { Result } from '@/lib/result';

export const requireDepartmentManagement = async (): Promise<Result<PublicUserWithCompany>> => {
  const roleResult = await requireRole([ROLE.COMPANY_ADMIN, ROLE.DEPARTMENT_ADMIN]);
  if (!roleResult.success) return { success: false, error: roleResult.error };

  const companyResult = checkHasCompany(roleResult.data.user);
  if (!companyResult.success) return { success: false, error: companyResult.error };

  return { success: true, data: companyResult.data };
};