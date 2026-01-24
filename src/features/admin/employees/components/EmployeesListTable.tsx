'use client';

import { DataTable } from '@/components/table/DataTable';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { RoleType } from '@/features/system/users/type/roleType';
import { UserType } from '@/features/system/users/type/userType';
import { createEmployeeColumns } from '../table/CreateEmployeeColumns';

type EmployeesListTableProps = {
  users: UserType[];
  departments: DepartmentType[];
  roles: RoleType[];
};

const EmployeesListTable = ({ users, departments, roles }: EmployeesListTableProps) => {
  return <DataTable columns={createEmployeeColumns({ departments, roles })} data={users} enableFilter />;
};

export default EmployeesListTable;
