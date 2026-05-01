import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { monthlyAttendanceApprovals } from '@/lib/db/schema';
import { thisMonthJST } from './dateUtils';

export const fetchMonthlyApprovalStatusCode = async (userId: string, companyId: string): Promise<string | null> => {
  const thisMonth = thisMonthJST();
  const approval = await db.query.monthlyAttendanceApprovals.findFirst({
    where: and(
      eq(monthlyAttendanceApprovals.userId, userId),
      eq(monthlyAttendanceApprovals.companyId, companyId),
      eq(monthlyAttendanceApprovals.targetMonth, thisMonth),
    ),
    columns: { statusCode: true },
  });
  return approval?.statusCode ?? null;
};
