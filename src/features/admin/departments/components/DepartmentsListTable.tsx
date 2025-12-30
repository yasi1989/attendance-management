'use client';

import { DataTable } from '@/components/table/DataTable';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { UserType } from '@/features/system/users/type/userType';
import { createDepartmentsColumns } from '../table/CreateDepartmentsColumns';

type DepartmentsListTableProps = {
  departments: DepartmentType[];
  users: UserType[];
};

const DepartmentsListTable = ({ departments, users }: DepartmentsListTableProps) => {
  return <DataTable columns={createDepartmentsColumns(departments, users)} data={departments} enableFilter />;
};

export default DepartmentsListTable;
