import { Card, CardContent } from '@/components/ui/card';
import { UserType } from '@/features/system/users/type/userType';
import { RoleType } from '@/features/system/users/type/roleType';
import { CompanyType } from '@/features/system/companies/type/companyType';
import UsersListTable from '@/features/system/users/components/UsersListTable';
import CommonPageHeader from '@/components/layout/CommonPageHeader';
import { Users } from 'lucide-react';

type UsersPresentationalProps = {
  users: UserType[];
  companies: CompanyType[];
  roles: RoleType[];
};

const UsersPresentational = ({ users, companies, roles }: UsersPresentationalProps) => {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 overflow-hidden">
      <CommonPageHeader
        title="ユーザー管理"
        description="登録されているユーザーを確認・管理できます"
        icon={<Users className="w-6 h-6 text-white" />}
      />

      <CardContent className="bg-gradient-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border-t border-slate-200/30 dark:border-slate-700/30 p-6 space-y-6">
        <div className="overflow-x-auto">
          <UsersListTable users={users} companies={companies} roles={roles} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersPresentational;
