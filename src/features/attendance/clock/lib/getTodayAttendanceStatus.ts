import { and, eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/lib/db/drizzle';
import { attendances, monthlyAttendanceApprovals } from '@/lib/db/schema';
import { AttendanceStatus } from '../types/types';
import { thisMonthJST, todayJST } from './dateUtils';
import { getClockUserContext } from './getClockUserContext';

export const getTodayAttendanceStatus = async (): Promise<AttendanceStatus> => {
  const session = await auth();
  if (!session?.user?.id) return { type: 'not_started' };

  const context = await getClockUserContext(session.user.id);

  if (context.type === 'system_admin') return { type: 'system_admin' };

  const today = todayJST();

  if (context.type === 'with_company') {
    const thisMonth = thisMonthJST();

    const approval = await db.query.monthlyAttendanceApprovals.findFirst({
      where: and(
        eq(monthlyAttendanceApprovals.userId, context.userId),
        eq(monthlyAttendanceApprovals.companyId, context.companyId),
        eq(monthlyAttendanceApprovals.targetMonth, thisMonth),
      ),
      columns: { statusCode: true },
    });

    if (approval?.statusCode === 'Approved') return { type: 'approved' };
    if (approval?.statusCode === 'Submitted') return { type: 'submitted' };
  }

  const record = await db.query.attendances.findFirst({
    where: and(eq(attendances.userId, context.userId), eq(attendances.workDate, today)),
    columns: { startTime: true, endTime: true },
  });

  if (!record) return { type: 'not_started' };
  if (record.endTime != null) return { type: 'clocked_out' };
  if (record.startTime != null) return { type: 'clocked_in', startTime: record.startTime };

  return { type: 'not_started' };
};
