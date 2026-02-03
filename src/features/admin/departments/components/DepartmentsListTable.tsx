'use client';

import { DataTable } from '@/components/table/DataTable';
import { Department, User } from '@/lib/actionTypes';
import { createDepartmentsColumns } from '../table/CreateDepartmentsColumns';

type DepartmentsListTableProps = {
  departments: Department[];
  users: User[];
};

const DepartmentsListTable = ({ departments, users }: DepartmentsListTableProps) => {
  return <DataTable columns={createDepartmentsColumns(departments, users)} data={departments} enableFilter />;
};

export default DepartmentsListTable;
