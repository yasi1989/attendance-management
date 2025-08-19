import CommonSkeleton from '@/components/layout/CommonSkeleton';
import { Suspense } from 'react';
import ApprovalContainer from './container';
import { isValidStatusWithAll } from '@/lib/status';
import { STATUS } from '@/consts/status';
import { isValidMonth, isValidYear } from '@/lib/date';

type ApprovalPageProps = {
  params: Promise<{
    year: string;
    month: string;
    status: string;
    params: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
    status = resolvedParams.params[2] ? resolvedParams.params[2] : STATUS.SUBMITTED.value;
  } else {
    year = resolvedParams.year ? Number(resolvedParams.year) : now.getFullYear();
    month = resolvedParams.month ? Number(resolvedParams.month) : now.getMonth() + 1;
    status = resolvedParams.status ? resolvedParams.status : STATUS.SUBMITTED.value;
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
  const validatedStatus = isValidStatusWithAll(status) ? status : STATUS.SUBMITTED.value;

  return (
    <Suspense fallback={<CommonSkeleton />}>
      <ApprovalContainer year={validatedYear} month={validatedMonth} status={validatedStatus} />
    </Suspense>
  );
};

export default ApprovalPage;
