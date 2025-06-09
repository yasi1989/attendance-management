'use client';

import { DataTable } from '@/components/DataTable';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { columnsDef } from './DepartmentsColumns';

type DepartmentsListTableProps = {
  departments: DepartmentType[];
};

const DepartmentsListTable = ({ departments }: DepartmentsListTableProps) => {
  const columns = columnsDef(departments);
  return <DataTable columns={columns} data={departments} />;
};

export default DepartmentsListTable;
