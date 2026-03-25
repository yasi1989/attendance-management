import { and, eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { STATUS } from '@/consts/status';
import { db } from '@/lib/db/drizzle';
import { attendances, monthlyAttendanceApprovals } from '@/lib/db/schema';
import { CLOCK_STATUS_TYPE, CLOCK_USER_TYPE } from '../consts/constants';
import { ClockStatus } from '../types/types';
import { thisMonthJST, todayJST } from './dateUtils';
import { getClockUserContext } from './getClockUserContext';

export const getTodayAttendanceStatus = async (): Promise<ClockStatus> => {
  const session = await auth();
  if (!session?.user?.id) return { type: CLOCK_STATUS_TYPE.NOT_STARTED };

  const context = await getClockUserContext(session.user.id);

  if (context.type === CLOCK_USER_TYPE.SYSTEM_ADMIN) return { type: CLOCK_STATUS_TYPE.SYSTEM_ADMIN };

  const today = todayJST();

  if (context.type === CLOCK_USER_TYPE.WITH_COMPANY) {
    const thisMonth = thisMonthJST();

    const approval = await db.query.monthlyAttendanceApprovals.findFirst({
      where: and(
        eq(monthlyAttendanceApprovals.userId, context.userId),
        eq(monthlyAttendanceApprovals.companyId, context.companyId),
        eq(monthlyAttendanceApprovals.targetMonth, thisMonth),
      ),
      columns: { statusCode: true },
    });

    if (approval?.statusCode === STATUS.APPROVED.value) return { type: CLOCK_STATUS_TYPE.APPROVED };
    if (approval?.statusCode === STATUS.SUBMITTED.value) return { type: CLOCK_STATUS_TYPE.SUBMITTED };
  }

  const record = await db.query.attendances.findFirst({
    where: and(eq(attendances.userId, context.userId), eq(attendances.workDate, today)),
    columns: { startTime: true, endTime: true },
  });

  if (!record) return { type: CLOCK_STATUS_TYPE.NOT_STARTED };
  if (record.endTime != null) return { type: CLOCK_STATUS_TYPE.CLOCKED_OUT };
  if (record.startTime != null) return { type: CLOCK_STATUS_TYPE.CLOCKED_IN, startTime: record.startTime };

  return { type: CLOCK_STATUS_TYPE.NOT_STARTED };
};
