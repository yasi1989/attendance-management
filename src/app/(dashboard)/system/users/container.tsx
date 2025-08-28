import UsersPresentational from './presentational';
import { fetchUsers } from '@/features/system/users/api/fetches';

const UsersContainer = async () => {
  const users = await fetchUsers();
  return <UsersPresentational users={users} />;
};

export default UsersContainer;
