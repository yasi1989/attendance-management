import { format, parseISO } from 'date-fns';

export const formatDateToISOString = (date: Date, formatString = 'yyyy-MM-dd'): string => {
  return format(date, formatString);
};

export const parseISOStringToDate = (dateString: string): Date => {
  return parseISO(dateString);
};
