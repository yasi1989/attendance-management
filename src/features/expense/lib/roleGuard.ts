import { ROLE } from '@/consts/role';
import { checkHasCompany, PublicUserWithCompany, requireRole } from '@/features/auth/lib/authGuard';
import { Result } from '@/lib/result';

export const requireExpenseAccess = async (): Promise<Result<PublicUserWithCompany>> => {
  const roleResult = await requireRole([ROLE.DEPARTMENT_ADMIN, ROLE.COMPANY_ADMIN, ROLE.GENERAL_USER]);
  if (!roleResult.success) return { success: false, error: roleResult.error };

  const {
    data: { user },
  } = roleResult;

  const companyResult = checkHasCompany(user);
  if (!companyResult.success) return { success: false, error: companyResult.error };

  return { success: true, data: companyResult.data };
};
