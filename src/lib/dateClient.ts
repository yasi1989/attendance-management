import { format, isValid, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

const MINUTES_IN_HOUR = 60;

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

export const formatMinutesToTimeString = (minutes: number | undefined | null): string => {
  if (minutes == null) return '';
  const hours = Math.floor(minutes / MINUTES_IN_HOUR);
  const mins = minutes % MINUTES_IN_HOUR;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

export const parseTimeStringToMinutes = (timeString: string | undefined): number | undefined => {
  if (!timeString) return undefined;
  const [hours, minutes] = timeString.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return undefined;
  return hours * MINUTES_IN_HOUR + minutes;
};
