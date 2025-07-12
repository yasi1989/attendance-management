import { Card, CardContent } from '@/components/ui/card';
import { UpsertDepartmentDialog } from '@/features/admin/departments/components/UpsertDepartmentDialog';
import DepartmentsListTable from '@/features/admin/departments/components/DepartmentsListTable';
import { UserType } from '@/features/system/users/type/userType';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import AddButton from '@/components/AddButton';
import CommonPageHeader from '@/components/CommonPageHeader';

type DepartmentsPresentationalProps = {
  departments: DepartmentType[];
  users: UserType[];
};

const DepartmentsPresentational = ({ departments, users }: DepartmentsPresentationalProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CommonPageHeader
        title="部署・役職管理"
        description="登録されている部署・役職情報を確認・管理できます"
        actionDialog={
          <UpsertDepartmentDialog type="add" allDepartments={departments} users={users}>
            <AddButton label="部署・役職登録" />
          </UpsertDepartmentDialog>
        }
      />

      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <DepartmentsListTable departments={departments} users={users} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentsPresentational;
