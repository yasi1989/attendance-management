import { ROLE, RoleCodeType } from '@/consts/role';
import { checkHasCompany, requireRole } from '@/features/auth/lib/authGuard';
import { PublicUserWithRole } from '@/lib/actionTypes';
import { Result } from '@/lib/result';

const _ROLES_WITHOUT_COMPANY: RoleCodeType[] = [ROLE.PERSONAL_USER, ROLE.SYSTEM_ADMIN];

export const requireExpenseAccess = async (): Promise<Result<PublicUserWithRole>> => {
  const roleResult = await requireRole([ROLE.DEPARTMENT_ADMIN, ROLE.COMPANY_ADMIN, ROLE.GENERAL_USER]);
  if (!roleResult.success) return { success: false, error: roleResult.error };

  const {
    data: { user },
  } = roleResult;

  const companyResult = checkHasCompany(user);
  if (!companyResult.success) return { success: false, error: companyResult.error };

  return { success: true, data: user };
};
