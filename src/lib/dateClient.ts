import { VALIDATION_DATE, VALIDATION_DATE_FORMAT } from '@/consts/validate';
import { format, isValid, parse, startOfDay, parseISO, addDays, subDays } from 'date-fns';
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

export const formatDateTimeForDisplay = (
  date: Date | string | number | undefined,
  options: {
    dateFormat?: string;
    timeFormat?: string;
    separator?: string;
  } = {},
): string => {
  const { dateFormat = 'yyyy-MM-dd', timeFormat = 'HH:mm', separator = ' ' } = options;
  const dateObj = toDateObject(date);
  if (!dateObj) return '';
  const dateStr = format(dateObj, dateFormat, { locale: ja });
  const timeStr = format(dateObj, timeFormat, { locale: ja });
  return `${dateStr}${separator}${timeStr}`;
};

export const parseDateInputDateString = (
  dateString: string,
  baseDate: Date = new Date(VALIDATION_DATE.YEAR.MIN, VALIDATION_DATE.MONTH.MIN - 1, VALIDATION_DATE.DAY.MIN),
): Date | undefined => {
  if (!dateString) return undefined;
  const parseDate = VALIDATION_DATE_FORMAT.DATES
    .map((format) => parse(dateString, format, baseDate))
    .find((date) => isValid(date));
  if (parseDate) return startOfDay(parseDate);
  const isoDate = parseISO(dateString);
  return isValid(isoDate) ? startOfDay(isoDate) : undefined;
};

export const parseTimeInputTimeString = (
  timeString: string,
  baseDate: Date = new Date(VALIDATION_DATE.YEAR.MIN, VALIDATION_DATE.MONTH.MIN - 1, VALIDATION_DATE.DAY.MIN),
): Date | undefined => {
  if (!timeString) return undefined;
  return  VALIDATION_DATE_FORMAT.TIMES.map((format) => parse(timeString, format, startOfDay(baseDate))).find((date) => isValid(date));
};

export const parseTimestampInputDateString = (
  dateString: string,
  baseDate: Date = new Date(VALIDATION_DATE.YEAR.MIN, VALIDATION_DATE.MONTH.MIN - 1, VALIDATION_DATE.DAY.MIN),
): number | undefined => {
  if (!dateString) return undefined;

  const parsedDate = VALIDATION_DATE_FORMAT.DATES
    .map((format) => parse(dateString, format, baseDate))
    .find((date) => isValid(date));
  if (parsedDate) return startOfDay(parsedDate).getTime();

  const isoDate = parseISO(dateString);
  return isValid(isoDate) ? startOfDay(isoDate).getTime() : undefined;
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

export const parseTimestampInputDateTimeString = (
  dateTimeString: string,
  baseDate: Date = new Date(VALIDATION_DATE.YEAR.MIN, VALIDATION_DATE.MONTH.MIN - 1, VALIDATION_DATE.DAY.MIN),
): number | undefined => {
  if (!dateTimeString) return undefined;

  const parsedDateTime = VALIDATION_DATE_FORMAT.DATE_TIMES
    .map((format) => parse(dateTimeString, format, baseDate))
    .find((date) => isValid(date));
  if (parsedDateTime) return parsedDateTime.getTime();

  const isoDateTime = parseISO(dateTimeString);
  return isValid(isoDateTime) ? isoDateTime.getTime() : undefined;
};

export const getDateRange = (startDate: Date, endDate: Date): Date[] => {
  if (!isValid(startDate) || !isValid(endDate)) return [];

  const dates: Date[] = [];
  let currentDate = startOfDay(startDate);
  const end = startOfDay(endDate);

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};

export const getWeekRange = (date: Date = new Date()): { start: Date; end: Date; dates: Date[] } => {
  const start = subDays(startOfDay(date), date.getDay());
  const end = addDays(start, 6);
  const dates = getDateRange(start, end);

  return { start, end, dates };
};
