'use client';

import { DataTable } from '@/components/DataTable';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { columnsDef } from './DepartmentsColumns';
import { UserType } from '@/features/system-admin/users/type/userType';

type DepartmentsListTableProps = {
  departments: DepartmentType[];
  users: UserType[];
};

const DepartmentsListTable = ({ departments, users }: DepartmentsListTableProps) => {
  const columns = columnsDef(departments, users);
  return <DataTable columns={columns} data={departments} />;
};

export default DepartmentsListTable;
