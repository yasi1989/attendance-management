import { DepartmentType } from '@/features/system/users/type/departmentType';
import { departments, users } from '@/features/system/users/const/mockData';
import { UserType } from '@/features/system/users/type/userType';

export const fetchDepartments = async (): Promise<{ departments: DepartmentType[]; users: UserType[] }> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // 本番はauth.jsからユーザ情報を取得
  const userId = 'u3a2b3c4-5d6e-789f-a1b2-c3d4e5f67892';
  const myUser = users.find((user) => user.id === userId);
  const myCompanyUsers = users.filter((user) => user.companyId === myUser?.companyId);
  const myDepartments = departments.filter((department) => department.companyId === myUser?.companyId);
  return { departments: myDepartments, users: myCompanyUsers };
};
