'use client';

import { DataTable } from '@/components/table/DataTable';
import { UserType } from '../type/userType';
import { CompanyType } from '../../companies/type/companyType';
import { RoleType } from '../type/roleType';
import { createUsersColumns } from '../table/CreateUsersColumns';

type UsersListTableProps = {
  users: UserType[];
  companies: CompanyType[];
  roles: RoleType[];
};

const UsersListTable = ({ users, companies, roles }: UsersListTableProps) => {
  return <DataTable data={users} columns={createUsersColumns({ companies, roles })} enableFilter />;
};

export default UsersListTable;
