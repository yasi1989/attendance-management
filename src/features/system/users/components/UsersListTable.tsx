'use client';

import { DataTable } from '@/components/table/DataTable';
import { columnsDef } from './UsersColumns';
import { FetchUsersDataResponse } from '../type/fetchResultResponse';

type UsersListTableProps = {
  users: FetchUsersDataResponse;
};

const UsersListTable = ({ users }: UsersListTableProps) => {
  const { allCompanies, allRoles, usersData } = users;
  const columns = columnsDef({ allCompanies, allRoles });
  return <DataTable data={usersData} columns={columns} enableFilter />;
};

export default UsersListTable;
