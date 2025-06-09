import { companies } from "@/features/system-admin/company/const/mockData";
import { users } from "@/features/system-admin/users/const/mockData";
import { departments } from "@/features/system-admin/users/const/mockData";
import { roles } from "@/features/system-admin/users/const/mockData";

export const fetchEmployees = () => {
  // 本番はauth.jsからユーザ情報を取得
  const userId = 'u3a2b3c4-5d6e-789f-a1b2-c3d4e5f67892';
  const user = users.find((user) => user.id === userId);
  const company = companies.find((company) => company.id === user?.companyId);
  // 自社に紐づくユーザと部署を取得
  const sampleUsers = users.filter((user) => user.companyId === company?.id);
  const sampleDepartments = departments.filter((department) => department.companyId === company?.id);
  return {
    users: sampleUsers,
    departments: sampleDepartments,
    roles,
  };
};
