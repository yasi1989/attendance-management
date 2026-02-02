import { Suspense } from 'react';
import CommonSkeleton from '@/components/layout/CommonSkeleton';
import UsersContainer from './container';

const UsersPage = () => {
  return (
    <Suspense fallback={<CommonSkeleton />}>
      <UsersContainer />
    </Suspense>
  );
};

export default UsersPage;
