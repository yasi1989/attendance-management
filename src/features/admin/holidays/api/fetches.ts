import { auth } from '@/auth';
import { db } from '@/lib/db/drizzle';
import { Holiday } from '@/lib/actionTypes';

export const fetchHolidays = async (year: number): Promise<Holiday[]> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('ログインしてください');
    }

    const userId = session.user.id;
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
    });

    if (!user) {
      throw new Error('ユーザーが見つかりません。');
    }

    if (!user?.companyId) {
      throw new Error('所属会社がありません。');
    }
    const companyId = user.companyId;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    return await db.query.holidays.findMany({
      where: (holidays, { eq, and, gte, lte }) =>
        and(
          eq(holidays.companyId, companyId),
          gte(holidays.holidayDate, startDate),
          lte(holidays.holidayDate, endDate),
        ),
      orderBy: (holidays, { desc }) => [desc(holidays.createdAt)],
    });
  } catch (error) {
    console.error('データ取得に失敗しました。', error);
    throw error;
  }
};
