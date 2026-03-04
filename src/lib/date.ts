import { eachDayOfInterval } from 'date-fns';
import { VALIDATION_DATE } from '@/consts/validate';
import { formatDateForDisplay } from './dateClient';

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
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  return { startDate, endDate };
};

export const getYearRange = (year: number): { startDate: Date; endDate: Date } => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  return { startDate, endDate };
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
