import { Suspense } from 'react';
import CommonSkeleton from '@/components/layout/CommonSkeleton';
import CompaniesContainer from './container';

const CompaniesPage = () => {
  return (
    <Suspense fallback={<CommonSkeleton />}>
      <CompaniesContainer />
    </Suspense>
  );
};

export default CompaniesPage;
