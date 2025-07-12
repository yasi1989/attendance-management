import { Suspense } from 'react';
import DepartmentsContainer from './container';
import CommonSkeleton from '@/components/CommonSkeleton';

const DepartmentsPage = () => {
  return (
    <Suspense fallback={<CommonSkeleton />}>
      <DepartmentsContainer />
    </Suspense>
  );
};

export default DepartmentsPage;
