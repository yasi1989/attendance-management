import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserTable from './UserTable';
import { UserType } from '../type/userType';
type UsersEditPageProps = {
  users: UserType[];
};

const UsersEditPage = ({ users }: UsersEditPageProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">ユーザ管理</CardTitle>
        <CardDescription>登録されているユーザを確認・管理できます。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <UserTable users={users} />
      </CardContent>
    </Card>
  );
};

export default UsersEditPage;
