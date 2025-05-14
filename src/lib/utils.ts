import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateToISOString = (date: Date, formatString = 'yyyy-MM-dd'): string => {
  return format(date, formatString);
};

export const parseISOStringToDate = (dateString: string): Date => {
  return parseISO(dateString);
};

export const truncateString = (str: string, maxLength: number): string => {
  return str.length <= maxLength ? str : str.substring(0, maxLength) + '...';
};