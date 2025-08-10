import CommonSkeleton from '@/components/layout/CommonSkeleton';
import { isValidMonth, isValidYear } from '@/features/attendance/calendar/lib/calenderUtils';
import { Suspense } from 'react';
import { StatusType } from '@/types/statusType';
import ApprovalContainer from './container';

type ApprovalPageProps = {
  params: Promise<{
    year: string;
    month: string;
    status: string;
    params: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const isValidStatus = (status: string): status is StatusType => {
  return ['Submitted', 'Approved', 'Rejected', 'All'].includes(status);
};

const ApprovalPage = async ({ params, searchParams }: ApprovalPageProps) => {
  const now = new Date();

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  let year: number;
  let month: number;
  let status: string;

  if (resolvedParams.params) {
    year = resolvedParams.params[0] ? Number(resolvedParams.params[0]) : now.getFullYear();
    month = resolvedParams.params[1] ? Number(resolvedParams.params[1]) : now.getMonth() + 1;
    status = resolvedParams.params[2] ? resolvedParams.params[2] : 'Submitted';
  } else {
    year = resolvedParams.year ? Number(resolvedParams.year) : now.getFullYear();
    month = resolvedParams.month ? Number(resolvedParams.month) : now.getMonth() + 1;
    status = resolvedParams.status ? resolvedParams.status : 'Submitted';
  }

  if (resolvedSearchParams.year && typeof resolvedSearchParams.year === 'string') {
    year = Number(resolvedSearchParams.year);
  }
  if (resolvedSearchParams.month && typeof resolvedSearchParams.month === 'string') {
    month = Number(resolvedSearchParams.month);
  }
  if (resolvedSearchParams.status && typeof resolvedSearchParams.status === 'string') {
    status = resolvedSearchParams.status;
  }

  const validatedYear = isValidYear(year) ? year : now.getFullYear();
  const validatedMonth = isValidMonth(month) ? month : now.getMonth() + 1;
  const validatedStatus = isValidStatus(status) ? status : 'Submitted';

  return (
    <Suspense fallback={<CommonSkeleton />}>
      <ApprovalContainer year={validatedYear} month={validatedMonth} status={validatedStatus} />
    </Suspense>
  );
};

export default ApprovalPage;
