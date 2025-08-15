import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncate = (str: string, maxLength: number): string => {
  return str.length <= maxLength ? str : str.substring(0, maxLength) + '...';
};
