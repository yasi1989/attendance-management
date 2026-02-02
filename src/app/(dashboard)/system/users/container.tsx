import { fetchUsers } from '@/features/system/users/api/fetches';
import UsersPresentational from './presentational';

const UsersContainer = async () => {
  const users = await fetchUsers();
  return <UsersPresentational users={users} />;
};

export default UsersContainer;
