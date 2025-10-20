import { VALIDATION_CONSTANTS } from '@/features/attendance/calendar/const/calendar';
import { format, isValid, parse, parseISO } from 'date-fns';

export const formatDateToISOString = (date: Date | undefined, formatString = 'yyyy-MM-dd'): string => {
  return date && isValid(date) ? format(date, formatString) : '';
};

export const parseISOStringToDate = (dateString: string): Date | undefined => {
  const date = parseISO(dateString);
  return isValid(date) ? date : undefined;
};

export const timeStringToTimestamp = (timeString: string | undefined, baseDate: Date): number | undefined => {
  if (!timeString) return undefined;
  const time = parse(timeString, 'HH:mm', baseDate);
  return isValid(time) ? time.getTime() : undefined;
};

export const timestampToTimeString = (timestamp: number | undefined): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return isValid(date) ? format(date, 'HH:mm') : '';
};

export const getYearOptions = (currentYear: number, length: number, offset: number): number[] => {
  return Array.from({ length }, (_, i) => currentYear - offset + i);
};

export const getMonthOptions = (length: number, offset: number): number[] => {
  return Array.from({ length }, (_, i) => i + offset);
};

export function isValidYear(year: number): boolean {
  return !Number.isNaN(year) && year >= VALIDATION_CONSTANTS.YEAR.MIN && year <= VALIDATION_CONSTANTS.YEAR.MAX;
}

export function isValidMonth(month: number): boolean {
  return !Number.isNaN(month) && month >= VALIDATION_CONSTANTS.MONTH.MIN && month <= VALIDATION_CONSTANTS.MONTH.MAX;
}