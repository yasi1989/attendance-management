import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserType } from '@/features/system/users/type/userType';
import EmployeesListTable from './EmployeesListTable';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { RoleType } from '@/features/system/users/type/roleType';

type EmployeesFormProps = {
  users: UserType[];
  departments: DepartmentType[];
  roles: RoleType[];
};

const EmployeesForm = ({ users, departments, roles }: EmployeesFormProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">社員情報管理</CardTitle>
        <CardDescription>登録されている社員情報を確認・管理できます。</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <EmployeesListTable users={users} departments={departments} roles={roles} />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeesForm;
