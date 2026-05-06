import { Suspense } from 'react';
import CommonSkeleton from '@/components/layout/CommonSkeleton';
import AccountContainer from './container';

const AccountPage = () => {
  return (
    <Suspense fallback={<CommonSkeleton />}>
      <AccountContainer />
    </Suspense>
  );
};

export default AccountPage;
