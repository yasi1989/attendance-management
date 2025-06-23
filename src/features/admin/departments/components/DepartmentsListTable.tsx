'use client';

import { DataTable } from '@/components/DataTable';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { columnsDef } from './DepartmentsColumns';
import { UserType } from '@/features/system/users/type/userType';

type DepartmentsListTableProps = {
  departments: DepartmentType[];
  users: UserType[];
};

const DepartmentsListTable = ({ departments, users }: DepartmentsListTableProps) => {
  const columns = columnsDef(departments, users);
  return <DataTable columns={columns} data={departments} enableFilter />;
};

export default DepartmentsListTable;
