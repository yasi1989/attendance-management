import { eachDayOfInterval, startOfMonth } from 'date-fns';
import { format as formatTZ, toZonedTime } from 'date-fns-tz';
import { JST } from '@/consts/date';
import { VALIDATION_DATE } from '@/consts/validate';
import { formatDateForDisplay } from './dateClient';

const MINUTES_IN_HOUR = 60;

const jstStringToDate = (dateStr: string): Date => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return toZonedTime(new Date(Date.UTC(y, m - 1, d)), JST);
};

export const todayJST = (): Date => {
  const now = new Date();
  const jst = toZonedTime(now, JST);
  const dateStr = formatTZ(jst, 'yyyy-MM-dd', { timeZone: JST });
  return jstStringToDate(dateStr);
};

export const thisMonthJST = (): Date => {
  const today = todayJST();
  return startOfMonth(today);
};

export const nowToMinutes = (): number => {
  const now = new Date();
  const jst = toZonedTime(now, JST);
  return jst.getHours() * MINUTES_IN_HOUR + jst.getMinutes();
};

export const getYearOptions = (currentYear: number, length: number, offset: number): number[] => {
  return Array.from({ length }, (_, i) => currentYear - offset + i);
};

export const getMonthOptions = (length: number, offset: number): number[] => {
  return Array.from({ length }, (_, i) => i + offset);
};

export function isValidYear(year: number): boolean {
  return !Number.isNaN(year) && year >= VALIDATION_DATE.YEAR.MIN && year <= VALIDATION_DATE.YEAR.MAX;
}

export function isValidMonth(month: number): boolean {
  return !Number.isNaN(month) && month >= VALIDATION_DATE.MONTH.MIN && month <= VALIDATION_DATE.MONTH.MAX;
}

export function isValidDay(day: number): boolean {
  return !Number.isNaN(day) && day >= VALIDATION_DATE.DAY.MIN && day <= VALIDATION_DATE.DAY.MAX;
}

export function isValidHour(hour: number): boolean {
  return !Number.isNaN(hour) && hour >= VALIDATION_DATE.HOUR.MIN && hour <= VALIDATION_DATE.HOUR.MAX;
}

export function isValidMinute(minute: number): boolean {
  return !Number.isNaN(minute) && minute >= VALIDATION_DATE.MINUTE.MIN && minute <= VALIDATION_DATE.MINUTE.MAX;
}

export const getYearMonthRange = (year: number, month: number): { startDate: Date; endDate: Date } => {
  const lastDay = new Date(year, month, 0).getDate();
  return {
    startDate: jstStringToDate(`${year}-${String(month).padStart(2, '0')}-01`),
    endDate: jstStringToDate(`${year}-${String(month).padStart(2, '0')}-${lastDay}`),
  };
};

export const getYearRange = (year: number): { startDate: Date; endDate: Date } => {
  return {
    startDate: jstStringToDate(`${year}-01-01`),
    endDate: jstStringToDate(`${year}-12-31`),
  };
};

export function calculateWorkDays(startDate: Date, endDate: Date, holidayDatesSet: Set<string>): string[] {
  return eachDayOfInterval({ start: startDate, end: endDate })
    .map((date) => formatDateForDisplay(date))
    .filter((dateStr) => isWorkDay(dateStr, holidayDatesSet));
}

function isWorkDay(dateStr: string, holidayDatesSet: Set<string>): boolean {
  const dayOfWeek = new Date(dateStr).getDay();
  return dayOfWeek !== 0 && dayOfWeek !== 6 && !holidayDatesSet.has(dateStr);
}

export function getMissingWorkDays(workDays: string[], registeredDatesSet: Set<string>): string[] {
  return workDays.filter((dateStr) => !registeredDatesSet.has(dateStr));
}
