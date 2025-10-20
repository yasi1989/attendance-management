import { Card, CardContent } from '@/components/ui/card';
import { UpsertDepartmentDialog } from '@/features/admin/departments/components/UpsertDepartmentDialog';
import DepartmentsListTable from '@/features/admin/departments/components/DepartmentsListTable';
import { UserType } from '@/features/system/users/type/userType';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import CommonPageHeader from '@/components/layout/CommonPageHeader';
import { Building } from 'lucide-react';
import { AddButton } from '@/components/button/AddButton';

type DepartmentsPresentationalProps = {
  departments: DepartmentType[];
  users: UserType[];
};

const DepartmentsPresentational = ({ departments, users }: DepartmentsPresentationalProps) => {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 overflow-hidden">
      <CommonPageHeader
        title="部署・役職管理"
        description="登録されている部署・役職情報を確認・管理できます"
        icon={<Building className="w-6 h-6 text-white" />}
        actionDialog={
          <UpsertDepartmentDialog type="add" allDepartments={departments} users={users}>
            <AddButton label="部署・役職登録" />
          </UpsertDepartmentDialog>
        }
      />

      <CardContent className="bg-gradient-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border-t border-slate-200/30 dark:border-slate-700/30 p-6 space-y-6">
        <div className="overflow-x-auto">
          <DepartmentsListTable departments={departments} users={users} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentsPresentational;
