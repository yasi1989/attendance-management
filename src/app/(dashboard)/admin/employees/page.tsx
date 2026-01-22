import { Suspense } from 'react';
import CommonSkeleton from '@/components/layout/CommonSkeleton';
import EmployeesContainer from './container';

const EmployeesPage = () => {
  return (
    <Suspense fallback={<CommonSkeleton />}>
      <EmployeesContainer />
    </Suspense>
  );
};

export default EmployeesPage;
