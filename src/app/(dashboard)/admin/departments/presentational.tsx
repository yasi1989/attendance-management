'use client';

import { Building } from 'lucide-react';
import { AddButton } from '@/components/button/AddButton';
import CommonPageHeader from '@/components/layout/CommonPageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { FORM_MODE } from '@/consts/formMode';
import DepartmentsListTable from '@/features/admin/departments/components/DepartmentsListTable';
import { UpsertDepartmentDialog } from '@/features/admin/departments/components/UpsertDepartmentDialog';
import { Department, User } from '@/lib/actionTypes';

type DepartmentsPresentationalProps = {
  departments: Department[];
  users: User[];
};

const DepartmentsPresentational = ({ departments, users }: DepartmentsPresentationalProps) => {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 overflow-hidden">
      <CommonPageHeader
        title="部署・役職管理"
        description="登録されている部署・役職情報を確認・管理できます"
        icon={<Building className="w-6 h-6 text-white" />}
        actionDialog={
          <UpsertDepartmentDialog type={FORM_MODE.ADD.value} allDepartments={departments} users={users}>
            <AddButton label="部署・役職登録" />
          </UpsertDepartmentDialog>
        }
      />

      <CardContent className="bg-linear-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border-t border-slate-200/30 dark:border-slate-700/30 p-6 space-y-6">
        <div className="overflow-x-auto">
          <DepartmentsListTable departments={departments} users={users} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentsPresentational;
