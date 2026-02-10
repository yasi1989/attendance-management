'use client';

import { DataTable } from '@/components/table/DataTable';
import { columnsDef } from '../table/CreateUsersColumns';
import { FetchUsersDataResponse } from '../type/fetchResultResponse';

type UsersListTableProps = {
  users: FetchUsersDataResponse;
};

const UsersListTable = ({ users }: UsersListTableProps) => {
  const { companies, roles, usersData } = users;
  const columns = columnsDef({ companies, roles });
  return <DataTable data={usersData} columns={columns} enableFilter />;
};

export default UsersListTable;
