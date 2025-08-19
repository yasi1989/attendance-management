import { companies } from '@/features/system/companies/const/mockData';
import { users } from '@/features/system/users/const/mockData';
import { departments } from '@/features/system/users/const/mockData';
import { roles } from '@/features/system/users/const/mockData';

export const fetchEmployees = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // 本番はauth.jsからユーザ情報を取得
  const userId = 'u3a2b3c4-5d6e-789f-a1b2-c3d4e5f67892';
  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new Error('ユーザが見つかりません');
  }
  // 自分の所属会社を取得
  const company = companies.find((company) => company.id === user?.companyId);
  if (!company) {
    throw new Error('所属会社が見つかりません');
  }
  // 自社に紐づくユーザと部署を取得
  const sampleUsers = users.filter((user) => user.companyId === company.id);
  const sampleDepartments = departments.filter((department) => department.companyId === company.id);
  return {
    users: sampleUsers,
    departments: sampleDepartments,
    roles,
  };
};
