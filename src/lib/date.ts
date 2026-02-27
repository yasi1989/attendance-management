import { VALIDATION_DATE } from '@/consts/validate';

export const getYearOptions = (currentYear: number, length: number, offset: number): number[] => {
  return Array.from({ length }, (_, i) => currentYear - offset + i);
};

export const getMonthOptions = (length: number, offset: number): number[] => {
  return Array.from({ length }, (_, i) => i + offset);
};

export function isValidYear(year: number): boolean {
  return !Number.isNaN(year) && year >= VALIDATION_DATE.YEAR.MIN && year <= VALIDATION_DATE.YEAR.MAX;
}

export function isValidMonth(month: number): boolean {
  return !Number.isNaN(month) && month >= VALIDATION_DATE.MONTH.MIN && month <= VALIDATION_DATE.MONTH.MAX;
}

export function isValidDay(day: number): boolean {
  return !Number.isNaN(day) && day >= VALIDATION_DATE.DAY.MIN && day <= VALIDATION_DATE.DAY.MAX;
}

export function isValidHour(hour: number): boolean {
  return !Number.isNaN(hour) && hour >= VALIDATION_DATE.HOUR.MIN && hour <= VALIDATION_DATE.HOUR.MAX;
}

export function isValidMinute(minute: number): boolean {
  return !Number.isNaN(minute) && minute >= VALIDATION_DATE.MINUTE.MIN && minute <= VALIDATION_DATE.MINUTE.MAX;
}
