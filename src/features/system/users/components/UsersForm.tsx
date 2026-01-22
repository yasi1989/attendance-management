import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Company } from '@/lib/actionTypes';
import { RoleType } from '../type/roleType';
import { UserType } from '../type/userType';
import UsersListTable from './UsersListTable';

type UsersFormProps = {
  users: UserType[];
  companies: Company[];
  roles: RoleType[];
};

const UsersForm = ({ users, companies, roles }: UsersFormProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">ユーザ管理</CardTitle>
        <CardDescription>登録されているユーザを確認・管理できます。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <UsersListTable users={users} companies={companies} roles={roles} />
      </CardContent>
    </Card>
  );
};

export default UsersForm;
