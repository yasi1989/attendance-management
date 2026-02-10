'use client';

import { DataTable } from '@/components/table/DataTable';
import { Department, Role, User } from '@/lib/actionTypes';
import { createEmployeeColumns } from '../table/CreateEmployeeColumns';

type EmployeesListTableProps = {
  users: User[];
  departments: Department[];
  roles: Role[];
};

const EmployeesListTable = ({ users, departments, roles }: EmployeesListTableProps) => {
  return <DataTable columns={createEmployeeColumns({ departments, roles })} data={users} enableFilter />;
};

export default EmployeesListTable;
