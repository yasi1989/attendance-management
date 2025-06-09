'use client';

import { DataTable } from '@/components/DataTable';
import { UserType } from '@/features/system-admin/users/type/userType';
import { RoleType } from '@/features/system-admin/users/type/roleType';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { columnsDef } from './EmployeesColumns';

type EmployeesListTableProps = {
  users: UserType[];
  departments: DepartmentType[];
  roles: RoleType[];
};

const EmployeesListTable = ({ users, departments, roles }: EmployeesListTableProps) => {
  const columns = columnsDef({ departments, roles });
  return <DataTable columns={columns} data={users} />;
};

export default EmployeesListTable;
