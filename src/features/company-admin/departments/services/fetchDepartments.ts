import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { departments, users } from '@/features/system-admin/users/const/mockData';
import { UserType } from '@/features/system-admin/users/type/userType';

export const fetchDepartments = (): { department: DepartmentType[]; users: UserType[] } => {
  // 本番はauth.jsからユーザ情報を取得
  const userId = 'u3a2b3c4-5d6e-789f-a1b2-c3d4e5f67892';
  const user = users.find((user) => user.id === userId);
  const myCompanyUsers = users.filter((user) => user.companyId === user?.companyId);
  const department = departments.filter((department) => department.companyId === user?.companyId);
  return { department, users: myCompanyUsers };
};
