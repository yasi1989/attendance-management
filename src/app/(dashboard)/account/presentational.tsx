'use client';

import { Building2 } from 'lucide-react';
import CommonPageHeader from '@/components/layout/CommonPageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { UpdateAccount } from '@/features/account/components/UpdateAccount';
import { NavUser } from '@/features/dashboard/types/type';

type AccountPresentationalProps = {
  navUser: NavUser;
};

const AccountPresentational = ({ navUser }: AccountPresentationalProps) => {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 overflow-hidden">
      <CommonPageHeader
        title="アカウント管理"
        description="登録されているアカウントを確認・管理できます"
        icon={<Building2 className="w-6 h-6 text-white" />}
      />

      <CardContent className="bg-linear-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border-t border-slate-200/30 dark:border-slate-700/30 p-6 space-y-6">
        <div className="overflow-x-auto">
          <UpdateAccount navUser={navUser} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountPresentational;
