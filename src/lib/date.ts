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