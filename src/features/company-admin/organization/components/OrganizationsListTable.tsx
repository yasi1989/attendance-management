'use client';

import { DataTable } from '@/components/DataTable';
import { organizationsColumns } from './OrganizationsColumns';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit } from 'lucide-react';
import DeleteOrganizationDialog from './DeleteOrganizationDialog';
import { UpsertOrganizationDialog } from './UpdateOrganizationDialog';

type OrganizationsListTableProps = {
  data: DepartmentType[];
};

const OrganizationsListTable = ({ data }: OrganizationsListTableProps) => {
  const actionColumn: ColumnDef<DepartmentType>[] = [
    {
      accessorKey: 'parentDepartmentName',
      id: 'parentDepartmentName',
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
              親部署
              <ArrowUpDown className="ml-1 h-4 w-4 text-slate-500" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const parentDepartment = data.find((d) => d.id === row.original.parentDepartmentId);
        return <div className="font-medium">{parentDepartment ? parentDepartment.departmentName : '未設定'}</div>;
      },
      meta: {
        enableFilter: true,
        japaneseLabel: '親部署',
      },
      filterFn: (row, _id, filterValue) => {
        const parentDepartment = data.find((d) => d.id === row.original.parentDepartmentId);
        return parentDepartment ? parentDepartment.departmentName.includes(filterValue) : false;
      },
    },
    {
      id: 'actions',
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost">操作</Button>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex space-x-1">
            <UpsertOrganizationDialog type="edit" userDepartment={row.original} allDepartments={data}>
              <Button className="items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                <Edit className="h-4 w-4 text-blue-600" />
              </Button>
            </UpsertOrganizationDialog>
            <DeleteOrganizationDialog />
          </div>
        );
      },
      meta: {
        enableFilter: false,
        japaneseLabel: '操作',
      },
    },
  ];
  const columns = [...organizationsColumns, ...actionColumn];
  return <DataTable columns={columns} data={data} />;
};

export default OrganizationsListTable;
