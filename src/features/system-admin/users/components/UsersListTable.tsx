'use client';

import { DataTable } from '@/components/DataTable';
import { UserType } from '../type/userType';
import { columnsDef } from './UsersColumns';
import { CompanyType } from '../../company/type/companyType';
import { RoleType } from '../type/roleType';

type UsersListTableProps = {
  users: UserType[];
  companies: CompanyType[];
  roles: RoleType[];
};

const UsersListTable = ({ users, companies, roles }: UsersListTableProps) => {
  const columns = columnsDef({ companies, roles });
  return <DataTable data={users} columns={columns} enableFilter />;
};

export default UsersListTable;
