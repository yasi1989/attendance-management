import { Card, CardContent } from '@/components/ui/card';
import { UserType } from '@/features/system/users/type/userType';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { RoleType } from '@/features/system/users/type/roleType';
import EmployeesListTable from '@/features/admin/employees/components/EmployeesListTable';
import CommonPageHeader from '@/components/CommonPageHeader';

type EmployeesPresentationalProps = {
  users: UserType[];
  departments: DepartmentType[];
  roles: RoleType[];
};

const EmployeesPresentational = ({ users, departments, roles }: EmployeesPresentationalProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CommonPageHeader title="従業員管理" description="登録されている従業員を確認・管理できます" />

      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <EmployeesListTable users={users} departments={departments} roles={roles} />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeesPresentational;
