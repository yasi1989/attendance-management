import { format, isValid, parse, parseISO } from 'date-fns';

export const formatDateToISOString = (date: Date, formatString = 'yyyy-MM-dd'): string => {
  return format(date, formatString);
};

export const parseISOStringToDate = (dateString: string): Date => {
  return parseISO(dateString);
};

export const parseDateStringToTimestamp = (date: string, time: string): number => {
  const dateTime = parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date());
  return isValid(dateTime) ? dateTime.getTime() : Number.NaN;
};
