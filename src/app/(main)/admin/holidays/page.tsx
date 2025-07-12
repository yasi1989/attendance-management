import { isValidYear } from '@/features/attendance/calendar/lib/calenderUtils';
import { Suspense } from 'react';
import HolidaysContainer from './container';
import CommonSkeleton from '@/components/CommonSkeleton';

type HolidayPageProps = {
  params: Promise<{
    year: string;
    params: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const HolidayPage = async ({ params, searchParams }: HolidayPageProps) => {
  const now = new Date();

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  let year: number;

  if (resolvedParams.params) {
    year = resolvedParams.params[0] ? Number.parseInt(resolvedParams.params[0], 10) : now.getFullYear();
  } else {
    year = resolvedParams.year ? Number.parseInt(resolvedParams.year, 10) : now.getFullYear();
  }

  if (resolvedSearchParams.year && typeof resolvedSearchParams.year === 'string') {
    year = Number.parseInt(resolvedSearchParams.year, 10);
  }
  const validatedYear = isValidYear(year) ? year : now.getFullYear();
  return (
    <Suspense fallback={<CommonSkeleton />}>
      <HolidaysContainer year={validatedYear} />
    </Suspense>
  );
};

export default HolidayPage;
