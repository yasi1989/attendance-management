import { TIMEZONE } from '@/consts/date';
import { format, isValid, parseISO, setHours, setMinutes, startOfDay } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

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

export const convertJSTTimeToUTC = (timeString: string, year: number, month: number, day: number): Date | null => {
  if (!timeString) return null;
  const timeMatch = timeString.match(/^(\d{1,2}):\d{1,2}$/);
  if (!timeMatch) return null;
  const hours = Number.parseInt(timeMatch[1], 10);
  const minutes = Number.parseInt(timeMatch[2], 10);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  const jstDateTime = setMinutes(setHours(startOfDay(new Date(year, month - 1, day)), hours), minutes);
  return fromZonedTime(jstDateTime, TIMEZONE.JST);
};

export const convertJSTDateTimeToUTC = (dateString: string, timeString: string): Date | null => {
  if (!dateString || !timeString) return null;

  const baseDate = parseISO(dateString);
  if (!isValid(baseDate)) return null;

  return convertJSTTimeToUTC(timeString, baseDate.getFullYear(), baseDate.getMonth() + 1, baseDate.getDate());
};

export const convertUTCToJSTDateString = (utcDate: Date, formatString = 'yyyy-MM-dd'): string => {
  if (!isValid(utcDate)) return '';

  const jstDate = toZonedTime(utcDate, TIMEZONE.JST);
  return format(jstDate, formatString);
};

export const convertUTCToJSTTimeString = (utcDate: Date): string => {
  if (!isValid(utcDate)) return '';

  const jstDate = toZonedTime(utcDate, TIMEZONE.JST);
  return format(jstDate, 'HH:mm');
};

export const convertUTCToJSTDateTimeString = (utcDate: Date, formatString = 'yyyy-MM-dd HH:mm'): string => {
  if (!isValid(utcDate)) return '';

  const jstDate = toZonedTime(utcDate, TIMEZONE.JST);
  return format(jstDate, formatString);
};
