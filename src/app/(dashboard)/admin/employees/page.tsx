import { Suspense } from 'react';
import EmployeesContainer from './container';
import CommonSkeleton from '@/components/layout/CommonSkeleton';

const EmployeesPage = () => {
  return (
    <Suspense fallback={<CommonSkeleton />}>
      <EmployeesContainer />
    </Suspense>
  );
};

export default EmployeesPage;
