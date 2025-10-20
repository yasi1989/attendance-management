import { Suspense } from 'react';
import CompaniesContainer from './container';
import CommonSkeleton from '@/components/layout/CommonSkeleton';

const CompaniesPage = () => {
  return (
    <Suspense fallback={<CommonSkeleton />}>
      <CompaniesContainer />
    </Suspense>
  );
};

export default CompaniesPage;
