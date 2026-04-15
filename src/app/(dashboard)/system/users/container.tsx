import { fetchUsers } from '@/features/system/users/api/fetches';
import UsersPresentational from './presentational';

const UsersContainer = async () => {
  const result = await fetchUsers();
  if (!result.success) throw result.error;

  return <UsersPresentational users={result.data} />;
};

export default UsersContainer;