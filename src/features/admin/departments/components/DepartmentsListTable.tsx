'use client';

import { DataTable } from '@/components/table/DataTable';
import { Department, PublicUser } from '@/lib/actionTypes';
import { createDepartmentsColumns } from '../table/CreateDepartmentsColumns';

type DepartmentsListTableProps = {
  departments: Department[];
  users: PublicUser[];
};

const DepartmentsListTable = ({ departments, users }: DepartmentsListTableProps) => {
  return <DataTable columns={createDepartmentsColumns(departments, users)} data={departments} enableFilter />;
};

export default DepartmentsListTable;
