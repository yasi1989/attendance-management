'use client';

import { DataTable } from '@/components/table/DataTable';
import { Company } from '@/lib/actionTypes';
import { createUsersColumns } from '../table/CreateUsersColumns';
import { RoleType } from '../type/roleType';
import { UserType } from '../type/userType';

type UsersListTableProps = {
  users: UserType[];
  companies: Company[];
  roles: RoleType[];
};

const UsersListTable = ({ users, companies, roles }: UsersListTableProps) => {
  return <DataTable data={users} columns={createUsersColumns({ companies, roles })} enableFilter />;
};

export default UsersListTable;
