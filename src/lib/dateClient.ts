import { VALIDATION_DATE, VALIDATION_DATE_FORMAT } from '@/consts/validate';
import { format, isValid, parse, startOfDay, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

const toDateObject = (date: Date | string | number | undefined | null): Date | null => {
  if (date == null) return null;
  const dateObj = (() => {
    switch (typeof date) {
      case 'number':
        return new Date(date);
      case 'string':
        return parseISO(date);
      default:
        return date;
    }
  })();
  return isValid(dateObj) ? dateObj : null;
};

export const formatDateForDisplay = (date: Date | string | number | undefined, dateFormat = 'yyyy-MM-dd'): string => {
  const dateObj = toDateObject(date);
  if (!dateObj) return '';
  return format(dateObj, dateFormat, { locale: ja });
};

export const formatTimeForDisplay = (date: Date | string | number | undefined, timeFormat = 'HH:mm'): string => {
  const dateObj = toDateObject(date);
  if (!dateObj) return '';
  return format(dateObj, timeFormat, { locale: ja });
};

export const parseTimestampInputTimeString = (
  timeString: string,
  baseDate: Date = new Date(VALIDATION_DATE.YEAR.MIN, VALIDATION_DATE.MONTH.MIN - 1, VALIDATION_DATE.DAY.MIN),
): number | undefined => {
  if (!timeString) return undefined;

  const parseTime = VALIDATION_DATE_FORMAT.TIMES
    .map((format) => parse(timeString, format, startOfDay(baseDate)))
    .find((date) => isValid(date));
  if (parseTime) return parseTime.getTime();

  const isoTime = parseISO(timeString);
  return isValid(isoTime) ? isoTime.getTime() : undefined;
};
