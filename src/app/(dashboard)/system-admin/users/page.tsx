import UsersEditPage from "@/features/system-admin/users/components/UsersEditPage";
import { fetchUsersData } from "@/features/system-admin/users/services/fetchUsers";

const UsersPage = () => {
  const data = fetchUsersData();
  return <UsersEditPage users={data.users} />;
};

export default UsersPage;
