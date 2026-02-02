import { Suspense } from 'react';
import CommonSkeleton from '@/components/layout/CommonSkeleton';
import { HOLIDAY_CATEGORIES_WITH_ALL } from '@/consts/holiday';
import { isValidYear } from '@/lib/date';
import { isValidHolidayCategoryWithAll } from '@/lib/holiday';
import HolidaysContainer from './container';

type HolidayPageProps = {
  params: Promise<{
    year: string;
    category: string;
    params: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const HolidayPage = async ({ params, searchParams }: HolidayPageProps) => {
  const now = new Date();

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  let year: number;
  let category: string;

  if (resolvedParams.params) {
    year = resolvedParams.params[0] ? Number(resolvedParams.params[0]) : now.getFullYear();
    category = resolvedParams.params[1] ? resolvedParams.params[1] : HOLIDAY_CATEGORIES_WITH_ALL.ALL.value;
  } else {
    year = resolvedParams.year ? Number(resolvedParams.year) : now.getFullYear();
    category = resolvedParams.category ? resolvedParams.category : HOLIDAY_CATEGORIES_WITH_ALL.ALL.value;
  }

  if (resolvedSearchParams.year && typeof resolvedSearchParams.year === 'string') {
    year = Number(resolvedSearchParams.year);
  }

  if (resolvedSearchParams.category && typeof resolvedSearchParams.category === 'string') {
    category = resolvedSearchParams.category;
  }

  const validatedYear = isValidYear(year) ? year : now.getFullYear();
  const validatedCategory = isValidHolidayCategoryWithAll(category) ? category : HOLIDAY_CATEGORIES_WITH_ALL.ALL.value;

  return (
    <Suspense fallback={<CommonSkeleton />}>
      <HolidaysContainer year={validatedYear} category={validatedCategory} />
    </Suspense>
  );
};

export default HolidayPage;
