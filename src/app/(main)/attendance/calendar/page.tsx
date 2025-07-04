import CalendarSkeleton from '@/features/attendance/calendar/components/CalenderSkeleton';
import { isValidMonth, isValidYear } from '@/features/attendance/calendar/lib/calenderUtils';
import { Suspense } from 'react';
import CalendarContainer from './container';

type CalendarPageProps = {
  params: Promise<{
    year?: string;
    month?: string;
    params?: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const CalendarPage = async ({ params, searchParams }: CalendarPageProps) => {
  const now = new Date();

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  let year: number;
  let month: number;

  if (resolvedParams.params) {
    year = resolvedParams.params[0] ? Number.parseInt(resolvedParams.params[0], 10) : now.getFullYear();
    month = resolvedParams.params[1] ? Number.parseInt(resolvedParams.params[1], 10) : now.getMonth() + 1;
  } else {
    year = resolvedParams.year ? Number.parseInt(resolvedParams.year, 10) : now.getFullYear();
    month = resolvedParams.month ? Number.parseInt(resolvedParams.month, 10) : now.getMonth() + 1;
  }

  if (resolvedSearchParams.year && typeof resolvedSearchParams.year === 'string') {
    year = Number.parseInt(resolvedSearchParams.year, 10);
  }
  if (resolvedSearchParams.month && typeof resolvedSearchParams.month === 'string') {
    month = Number.parseInt(resolvedSearchParams.month, 10);
  }

  const validatedYear = isValidYear(year) ? year : now.getFullYear();
  const validatedMonth = isValidMonth(month) ? month : now.getMonth() + 1;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Suspense fallback={<CalendarSkeleton />}>
        <CalendarContainer year={validatedYear} month={validatedMonth} />
      </Suspense>
    </div>
  );
};

export default CalendarPage;
