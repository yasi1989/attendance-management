import { VALIDATION_CONSTANTS } from '../const/calendar';

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

export function isValidYear(year: number): boolean {
  return !Number.isNaN(year) && year >= VALIDATION_CONSTANTS.YEAR.MIN && year <= VALIDATION_CONSTANTS.YEAR.MAX;
}

export function isValidMonth(month: number): boolean {
  return !Number.isNaN(month) && month >= VALIDATION_CONSTANTS.MONTH.MIN && month <= VALIDATION_CONSTANTS.MONTH.MAX;
}

export const formatDisplayYearMonth = (date: Date) => {
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月`;
};