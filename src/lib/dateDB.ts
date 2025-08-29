import { TIMEZONE } from '@/consts/date';
import { isValid, parseISO, startOfDay } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

export const convertJSTDateToUTC = (year: number, month: number, day: number): Date => {
  const jstDate = startOfDay(new Date(year, month - 1, day));
  return fromZonedTime(jstDate, TIMEZONE.JST);
};

export const convertJSTDateStringToUTC = (dateString: string): Date | null => {
  if (!dateString) return null;
  const parseDate = parseISO(dateString);
  if (!isValid(parseDate)) return null;
  const jstDate = startOfDay(parseDate);
  return fromZonedTime(jstDate, TIMEZONE.JST);
};