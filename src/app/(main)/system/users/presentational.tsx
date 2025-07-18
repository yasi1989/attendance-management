import { Card, CardContent } from '@/components/ui/card';
import { UserType } from '@/features/system/users/type/userType';
import { RoleType } from '@/features/system/users/type/roleType';
import { CompanyType } from '@/features/system/companies/type/companyType';
import UsersListTable from '@/features/system/users/components/UsersListTable';
import CommonPageHeader from '@/components/CommonPageHeader';
import { Users } from 'lucide-react';

type UsersPresentationalProps = {
  users: UserType[];
  companies: CompanyType[];
  roles: RoleType[];
};

const UsersPresentational = ({ users, companies, roles }: UsersPresentationalProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CommonPageHeader
        title="ユーザー管理"
        description="登録されているユーザーを確認・管理できます"
        icon={<Users className="w-6 h-6 text-white" />}
      />

      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <UsersListTable users={users} companies={companies} roles={roles} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersPresentational;
