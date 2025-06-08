import { format, isValid, parse, parseISO } from 'date-fns';

export const formatDateToISOString = (date: Date, formatString = 'yyyy-MM-dd'): string => {
  return isValid(date) ? format(date, formatString) : '';
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
