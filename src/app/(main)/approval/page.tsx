import CommonSkeleton from '@/components/CommonSkeleton';
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
  return ['Pending', 'Approved', 'Rejected', 'All'].includes(status);
};

const ApprovalPage = async ({ params, searchParams }: ApprovalPageProps) => {
  const now = new Date();

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  let year: number;
  let month: number;
  let status: string;

  if (resolvedParams.params) {
    year = resolvedParams.params[0] ? Number.parseInt(resolvedParams.params[0], 10) : now.getFullYear();
    month = resolvedParams.params[1] ? Number.parseInt(resolvedParams.params[1], 10) : now.getMonth() + 1;
    status = resolvedParams.params[2] ? resolvedParams.params[2] : 'Pending';
  } else {
    year = resolvedParams.year ? Number.parseInt(resolvedParams.year, 10) : now.getFullYear();
    month = resolvedParams.month ? Number.parseInt(resolvedParams.month, 10) : now.getMonth() + 1;
    status = resolvedParams.status ? resolvedParams.status : 'Pending';
  }

  if (resolvedSearchParams.year && typeof resolvedSearchParams.year === 'string') {
    year = Number.parseInt(resolvedSearchParams.year, 10);
  }
  if (resolvedSearchParams.month && typeof resolvedSearchParams.month === 'string') {
    month = Number.parseInt(resolvedSearchParams.month, 10);
  }
  if (resolvedSearchParams.status && typeof resolvedSearchParams.status === 'string') {
    status = resolvedSearchParams.status;
  }

  const validatedYear = isValidYear(year) ? year : now.getFullYear();
  const validatedMonth = isValidMonth(month) ? month : now.getMonth() + 1;
  const validatedStatus = isValidStatus(status) ? status : 'Pending';

  return (
    <Suspense fallback={<CommonSkeleton />}>
      <ApprovalContainer year={validatedYear} month={validatedMonth} status={validatedStatus} />
    </Suspense>
  );
};

export default ApprovalPage;
