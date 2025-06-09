import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserType } from '@/features/system-admin/users/type/userType';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { UpsertEmployeeDialog } from './UpdateEmployeeDialog';
import EmployeesListTable from './EmployeesListTable';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { RoleType } from '@/features/system-admin/users/type/roleType';

type EmployeesFormProps = {
  users: UserType[];
  departments: DepartmentType[];
  roles: RoleType[];
};

const EmployeesForm = ({ users, departments, roles }: EmployeesFormProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">社員管理</CardTitle>
        <CardDescription>登録されている社員を確認・管理できます。</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-start">
          <UpsertEmployeeDialog type="add" departments={departments} roles={roles}>
            <Button className="flex items-center gap-2 whitespace-nowrap self-start sm:self-center">
              <PlusCircle size={18} />
              社員登録
            </Button>
          </UpsertEmployeeDialog>
        </div>
        <div className="overflow-x-auto">
          <EmployeesListTable users={users} departments={departments} roles={roles} />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeesForm;
