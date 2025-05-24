import CustomUserPage from '@/features/admin/users/components/CustomUserPage';
import { fetchUserData } from '@/features/admin/users/services/fetchUserData';

const UsersPage = () => {
  const data = fetchUserData();
  return <CustomUserPage data={data} />;
};

export default UsersPage;
