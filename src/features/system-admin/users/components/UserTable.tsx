import { DataTable } from '@/components/DataTable';
import { UserType } from '../type/userType';
import { userColumns } from './UsersColumns';

const UserTable = ({ users }: { users: UserType[] }) => {
  return <DataTable data={users} columns={userColumns} />;
};

export default UserTable;
