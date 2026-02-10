'use server';
import { ROLE } from '@/consts/role';
import { requireCompanyAdmin } from '@/features/auth/lib/authRoleUtils';
import { db } from '@/lib/db/drizzle';
import { FetchEmployeesDataResponse } from '../type/fetchResultResponse';

export const fetchEmployees = async (): Promise<FetchEmployeesDataResponse> => {
  try {
    const { user } = await requireCompanyAdmin();
    const [users, departments, roles] = await Promise.all([
      db.query.users.findMany({
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
      users,
      departments,
      roles,
    };
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    throw error;
  }
};
