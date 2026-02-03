'use server';
import { requireCompanyAdmin } from '@/features/auth/lib/authRoleUtils';
import { db } from '@/lib/db/drizzle';
import { FetchDepartmentsDataResponse } from '../type/fetchResultResponse';

export const fetchDepartments = async (): Promise<FetchDepartmentsDataResponse> => {
  try {
    const { user } = await requireCompanyAdmin();
    const [myDepartments, myCompanyUsers] = await Promise.all([
      db.query.departments.findMany({
        where: (departments, { eq }) => eq(departments.companyId, user.companyId),
        orderBy: (departments, { asc }) => [asc(departments.departmentName)],
      }),
      db.query.users.findMany({
        where: (users, { eq }) => eq(users.companyId, user.companyId),
        with: {
          department: true,
          role: true,
        },
        orderBy: (users, { asc }) => [asc(users.name)],
      }),
    ]);

    return {
      departments: myDepartments,
      users: myCompanyUsers,
    };
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    throw error;
  }
};
