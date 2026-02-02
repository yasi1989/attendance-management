import { Suspense } from 'react';
import CommonSkeleton from '@/components/layout/CommonSkeleton';
import DepartmentsContainer from './container';

const DepartmentsPage = () => {
  return (
    <Suspense fallback={<CommonSkeleton />}>
      <DepartmentsContainer />
    </Suspense>
  );
};

export default DepartmentsPage;
