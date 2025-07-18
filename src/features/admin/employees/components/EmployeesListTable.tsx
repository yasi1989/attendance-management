'use client';

import { DataTable } from '@/components/table/DataTable';
import { UserType } from '@/features/system/users/type/userType';
import { RoleType } from '@/features/system/users/type/roleType';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { columnsDef } from './EmployeesColumns';

type EmployeesListTableProps = {
  users: UserType[];
  departments: DepartmentType[];
  roles: RoleType[];
};

const EmployeesListTable = ({ users, departments, roles }: EmployeesListTableProps) => {
  const columns = columnsDef({ departments, roles });
  return <DataTable columns={columns} data={users} enableFilter />;
};

export default EmployeesListTable;
