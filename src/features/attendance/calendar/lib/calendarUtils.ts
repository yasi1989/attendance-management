export function generateCalendarWeeks(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startDate = new Date(firstDay);

  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  const endDate = new Date(lastDay);

  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    currentWeek.push(new Date(currentDate));
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weeks;
}

export const formatDisplayYearMonth = (date: Date) => {
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月`;
};
