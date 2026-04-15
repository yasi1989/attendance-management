'use server';
import { ROLE } from '@/consts/role';
import { db } from '@/lib/db/drizzle';
import { Result } from '@/lib/result';
import { requireEmployeeManagement } from '../lib/roleGuard';
import { FetchEmployeesDataResponse } from '../type/fetchResultResponse';

export const fetchEmployees = async (): Promise<Result<FetchEmployeesDataResponse>> => {
  const authResult = await requireEmployeeManagement();
  if (!authResult.success) return { success: false, error: authResult.error };

  const user = authResult.data;

  try {
    const [users, departments, roles] = await Promise.all([
      db.query.users.findMany({
        columns: {
          hashedPassword: false,
          emailVerified: false,
        },
        where: (users, { eq }) => eq(users.companyId, user.companyId),
        with: {
          department: true,
          role: true,
        },
        orderBy: (users, { asc }) => [asc(users.name)],
      }),
      db.query.departments.findMany({
        where: (departments, { eq }) => eq(departments.companyId, user.companyId),
        orderBy: (departments, { asc }) => [asc(departments.departmentName)],
      }),
      db.query.roles.findMany({
        where: (roles, { ne }) => ne(roles.roleCode, ROLE.SYSTEM_ADMIN),
        orderBy: (roles, { asc }) => [asc(roles.roleName)],
      }),
    ]);

    return {
      success: true,
      data: { users, departments, roles },
    };
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    return { success: false, error: error instanceof Error ? error : new Error('データ取得に失敗しました。') };
  }
};