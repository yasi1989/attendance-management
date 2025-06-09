import UsersForm from "@/features/system-admin/users/components/UsersForm";
import { fetchUsersData } from "@/features/system-admin/users/services/fetchUsers";

const UsersPage = () => {
  const { users, companies, roles } = fetchUsersData();
  return <UsersForm users={users} companies={companies} roles={roles} />;
};

export default UsersPage;
